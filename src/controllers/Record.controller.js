// Record.controller.js

const Database = require('nedb');
const BaseCtrl = require('./_base/BaseCtrl.controller');
const RecordSet = require('../models/record/RecordSet.model');
const RecordSearch = require('../models/record/RecordSearch.model');

const { Config, Icons } = require('../constants/Global.constants');
const Utils = require('../utils/BaseUtil.util.js');

module.exports = class RecordCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(cursor, contextTtl) {
    return this.appliance.getRecordsCursor(cursor, contextTtl);
  }

  search(searchFilter) {
    return this.appliance.postRecordsSearch(searchFilter);
  }

  searchInit(search = {}) {
    return Object.assign(search, this.postRecordsSearch(search).data, { id: Utils.generateId() });
  }

  searchNext(cursor, contextTtl) {
    return (this.postRecordsCursor(cursor, contextTtl).data || { records: [] }).records;
  }

  // -------------------------------------
  // Save Functions
  // -------------------------------------

  save(search = {}) {
    search.db.find({}).exec((err, results) => {
      if (err) {
        console.error(`${Icons.Error} ${err}`);
      } else if (results.length === 0) {
        console.warn(`${Icons.Warn} No results found in database.`);
      } else {
        (new RecordSet(results)).writeToCSV(`records-${search.id}.csv`);
        console.info(`${Icons.Success} Saved ${results.length} records to CSV: records-${search.id}.csv`);
      }
    });
  }

  // -------------------------------------
  // Search Functions
  // -------------------------------------

  store(searchFilter = {}) {
    const search = this.searchInit(new RecordSearch(this.parseSearchFilter(searchFilter)));
    const db = new Database({ filename: `${Config.DB_DIR}/records-${search.id}.db`, autoload: true });

    this.printSearchInfo(search);

    const numPages = this.getPageCount(search);
    let { records } = search;
    let pageAt = 0;
    let count = 0;

    while (records && records.length > 0) {
      records = records.map((record) => this.parse(record, '_source'));
      db.insert(records);

      console.info(`[${++pageAt}/${numPages}] Processed ${(count += records.length)} results, awaiting next page...`);
      records = this.searchNext(search.cursor, search.context_ttl);
    }

    if (count === search.total) {
      console.info(`\n${Icons.Success} Committed ${count}/${search.total} results to DB: records-${search.id}.db`);
    } else {
      console.info(`\n${Icons.Warn} Committed ${count}/${search.total} records to DB: records-${search.id}.db`);
    }

    return Object.assign(search, { db, records });
  }

  // -------------------------------------
  // Utility Functions
  // -------------------------------------

  parseSearchFilter(searchFilter = {}) {
    if (!searchFilter.filter || !searchFilter.filter.rules) {
      return searchFilter;
    }

    searchFilter.filter.rules.forEach((rule) => {
      const deviceName = rule.value || rule.operand;

      if (deviceName.startsWith('*') && ['server', 'client', 'device'].includes(rule.field)) {
        const devices = this.appliance.devices().getByName(deviceName.replace('*', ''));

        if (devices.length > 0) {
          console.log('Substituting discovery id for name:', rule.value, '=>', devices[0].discovery_id);
          rule.operand = { type: 'device', value: devices[0].discovery_id };
          delete rule.value;
        }
      }
    });

    console.log(JSON.stringify(searchFilter, null, 2));
    return searchFilter;
  }

  printSearchInfo(search = {}) {
    console.info('------------------------------ SEARCH INFO ------------------------------------');
    console.info(`- Search ID (local): ${search.id}`);
    console.info(`- Search timestamp: ${Utils.parseId(search.id)}`);
    console.info(`- Search types: ${search.types || 'any'}`);
    console.info(`- Search limit: ${search.limit}`);
    console.info(`- Search results: ${search.total}`);
    console.info(`- Search from: ${new Date(search.from)}`);
    console.info(`- Search until: ${new Date(search.until)}`);
    console.info('-------------------------------------------------------------------------------\n');
  }

  getPageCount(search) {
    const { total = 0, limit = 0 } = search;
    return total % limit === 0 ? total / limit : Math.floor(total / limit) + 1;
  }

  // -------------------------------------
  // API Functions
  // -------------------------------------

  getRecordsCursor(cursor, contextTtl) {
    return this.appliance.getRecordsCursor(cursor, contextTtl);
  }

  postRecordsCursor(cursor, contextTtl) {
    return this.appliance.postRecordsCursor({ cursor }, contextTtl);
  }

  postRecordsSearch(search) {
    return this.appliance.postRecordsSearch(search);
  }
};
