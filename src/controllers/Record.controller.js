// Record.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const RecordSet = require('../models/records/RecordSet.model');
const RecordSearch = require('../models/records/RecordSearch.model');
const { Config, Icons } = require('../constants/Global.constants');

const Database = require('nedb');

module.exports = class RecordCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Save Functions
  // -------------------------------------

  saveToCSV(search = {}) {
    search.db.find({}, function(err, results) {
      if ( err || results.length == 0 ) {
        console.error(err);
        return;
      }

      const recordSet = new RecordSet(results);
      recordSet.writeToCSV({ filename: `${Config.DATA_DIR}/csv/records-${search.id}.csv` });

      console.log(`${Icons.Success} Saved ${results.length} records to CSV: records-${search.id}.csv`);
    });
  }

  // -------------------------------------
  // Search Functions
  // -------------------------------------

  search(params = {}) {
    const search = this.searchFirst(new RecordSearch(params));
    const db = new Database({ filename: `${Config.DATA_DIR}/db/records-${search.id}.db`, autoload: true });

    this.printSearchInfo(search);

    let records = search.records;
    let count = 0, pageAt = 0, numPages = this.getPageCount(search.total, search.limit);

    let lastRecord = null;

    while ( records && records.length > 0 ) {
      records.forEach(record => {
        db.insert(this.parse(record), (error) => {
          if ( error ) console.error(error)
        });
      });

      count += records.length;
      console.log(`[${++pageAt}/${numPages}] Processed ${count} results, awaiting next page...`);

      records = this.searchNext(search.cursor, search.context_ttl);
    }

    const msgSuccess = `\n${Icons.Success} Committed ${count}/${search.total} results to DB: records-${search.id}.db`;
    const msgWarning = `\n${Icons.Warn} Committed ${count}/${search.total} records to DB: records-${search.id}.db`;
    console.log(count == search.total ? msgSuccess : msgWarning);

    return Object.assign(search, { db, records });
  }

  searchFirst(search = {}) {
    const searchId = Date.now().toString(16);
    const getRecords = this.postRecordsSearch(search);

    if ( getRecords.error ) {
      console.log(`${Icons.Error} ${JSON.stringify(search, null, 2)}`);
    }

    return Object.assign(search, getRecords.data, { id: searchId })
  }

  searchNext(cursor, contextTtl) {
    let getRecords = this.postRecordsCursor(cursor, contextTtl);
    let attempts = 0;

    while ( !getRecords.success && attempts < 3 ) {
      if ( attempts++ < 3 ) {
        console.log('Retying next results, attempt ' + attempts);
        sleep(2000);
      }

      getRecords = this.postRecordsCursor(cursor, contextTtl);
    }

    if ( !getRecords.success ) {
      console.log('Search ended before retrieving all records.')
    }

    return getRecords.data.records || [];
  }

  // -------------------------------------
  // Utility Functions
  // -------------------------------------

  parse(data = {}) {
    return super.parse(data, '_source');
  }

  printSearchInfo(search = {}) {
    console.log();
    console.log(`------------------------------ SEARCH INFO ------------------------------------`);
    console.log(`- Search ID (local): ${search.id}`);
    // console.log(`- Search timestamp: ${parseInt(search.id, 16)}`);
    console.log(`- Search types: ${search.types || 'any'}`);
    console.log(`- Search limit: ${search.limit}`);
    console.log(`- Search results: ${search.total}`);
    console.log(`- Search context_ttl: ${search.context_ttl}`);
    console.log(`- Search from: ${new Date(search.from)}`);
    console.log(`- Search until: ${new Date(search.until)}`);
    console.log(`-------------------------------------------------------------------------------\n`);
  }

  getPageCount(total = 1, limit = 1) {
    return (total % limit) == 0 ? total / limit : Math.floor(total / limit) + 1;
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

}

function sleep(ms) {
  var start = new Date().getTime();
  for ( var i = 0; i < 1e7; i++ ) {
    if ( (new Date().getTime() - start) > ms ) break;
  }
}
