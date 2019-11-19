// Record.controller.js

const Database = require('nedb');
const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const RecordSet = require('../models/record/RecordSet.model');
const RecordSearch = require('../models/record/RecordSearch.model');
const { Config, Icons } = require('../constants/Global.constants');
const Utils = require('../utils/BaseUtil.util.js');

module.exports = class RecordCtrl extends BaseCtrl {
  // -------------------------------------
  // Save Functions
  // -------------------------------------

  saveToCSV(search = {}) {
    search.db.find({}).exec(function(err, results) {
      if (err) {
        console.error(`${Icons.Error} ${err}`);
      } else if (results.length == 0) {
        console.warn(`${Icons.Warn} No results found in database.`);
      } else {
        new RecordSet(results).writeToCSV({ filename: `records-${search.id}.csv` });
        console.info(`${Icons.Success} Saved ${results.length} records to CSV: records-${search.id}.csv`);
      }
    });
  }

  // -------------------------------------
  // Search Functions
  // -------------------------------------

  search(params = {}) {
    const search = this.searchInit(new RecordSearch(params));
    const db = new Database({ filename: `${Config.DB_DIR}/records-${search.id}.db`, autoload: true });

    this.printSearchInfo(search);

    let { records } = search;
    let count = 0;
    let pageAt = 0;
    const numPages = this.getPageCount(search.total, search.limit);

    while (records && records.length > 0) {
      records = records.map(record => this.parse(record, '_source'));
      db.insert(records);

      console.info(
        `[${++pageAt}/${numPages}] Processed ${(count += records.length)} results, awaiting next page...`
      );
      records = this.searchNext(search.cursor, search.context_ttl);
    }

    if (count == search.total) {
      console.info(
        `\n${Icons.Success} Committed ${count}/${search.total} results to DB: records-${search.id}.db`
      );
    } else {
      console.info(`\n${Icons.Warn} Committed ${count}/${search.total} records to DB: records-${search.id}.db`);
    }

    return Object.assign(search, { db, records });
  }

  searchInit(search = {}) {
    const searchId = Utils.generateId();
    const getRecords = this.postRecordsSearch(search);

    return Object.assign(search, getRecords.data, { id: searchId });
  }

  searchNext(cursor, contextTtl) {
    const getRecords = this.postRecordsCursor(cursor, contextTtl);

    return getRecords.data ? getRecords.data.records : [];
  }

  // -------------------------------------
  // Utility Functions
  // -------------------------------------

  printSearchInfo(search = {}) {
    console.info(`------------------------------ SEARCH INFO ------------------------------------`);
    console.info(`- Search ID (local): ${search.id}`);
    console.info(`- Search timestamp: ${Utils.parseId(search.id)}`);
    console.info(`- Search types: ${search.types || 'any'}`);
    console.info(`- Search limit: ${search.limit}`);
    console.info(`- Search results: ${search.total}`);
    console.info(`- Search from: ${new Date(search.from)}`);
    console.info(`- Search until: ${new Date(search.until)}`);
    console.info(`-------------------------------------------------------------------------------\n`);
  }

  getPageCount(total = 1, limit = 1) {
    return total % limit == 0 ? total / limit : Math.floor(total / limit) + 1;
  }

  // -------------------------------------
  // APIFunctions
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
