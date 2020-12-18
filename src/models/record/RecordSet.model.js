// RecordSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Record = require('./Record.model');

module.exports = class RecordSet extends BaseObjectSet {
  constructor(records = []) {
    super(Array.from(records).map((record) => new Record(record)));
  }

  writeToCSV({ filename = `records-${this.generateId()}.csv`, subkey = '_source', headers = true }) {
    super.writeToCSV({ filename, subkey, headers });
  }
};
