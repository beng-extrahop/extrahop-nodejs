// RecordSet.model.js

const BaseObjectSet = require('../../models/base/BaseObjectSet.model');
const Record = require('../../models/records/Record.model');

module.exports = class RecordSet extends BaseObjectSet {
  constructor(records = []) {
    super(records);
    records.forEach(record => this.push(new Record(record)));
  }

  writeToCSV({ filename, subkey = '_source' }) {
    super.writeToCSV({ filename, subkey });
  }
}
