// RecordSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Record = require('../../models/record/Record.model');
const fastCSV = require('fast-csv');
const fs = require('fs');
const { Config } = require('../../constants/Global.constants');

module.exports = class RecordSet extends Array {
  constructor(...records) {
    super(...records.map(record => new Record(record)));
  }

  // writeToCSV({ filename = `records-${this.generateId()}.csv`, subkey = '_source' }) {
  //   super.writeToCSV({ filename, subkey, headers: true });
  // }

  writeToCSV({ filename, subkey, headers }) {
    const stream = fs.createWriteStream(`${Config.CSV_DIR}/${filename}`, { encoding: 'utf8' });
    const data = subkey ? this.map(obj => obj[subkey]) : this;

    fastCSV.writeToStream(stream, data, { headers }).on('error', err => console.error(err));
  }

};
