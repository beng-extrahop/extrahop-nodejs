// RecordSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Record = require('./Record.model');

module.exports = class RecordSet extends BaseObjectSet {
  constructor(records = []) {
    super();
    records.forEach((record) => this.push(new Record(record)));
  }

  writeToCSV({ filename = `records-${this.generateId()}.csv`, subkey = '_source' }) {
    super.writeToCSV({ filename, subkey, headers: true });
  }
};
