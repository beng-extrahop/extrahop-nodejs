// RecordSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Record = require('../../models/record/Record.model');

module.exports = class RecordSet extends BaseObjectSet {

  constructor(...records) {
    super(...records.map(record => new Record(record)));
  }

  writeToCSV(options = {}) {
    const { filename = `devices-${this.generateId()}.csv`, subkey = '_source' } = options;
    super.writeToCSV(filename, subkey);
  }
}
