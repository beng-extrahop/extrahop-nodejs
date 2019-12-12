// RecordSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Record = require('../../models/record/Record.model');

module.exports = class RecordSet extends BaseObjectSet {
  constructor(...records) {
    super(...records.map(record => new Record(record)));
  }

  writeToCSV({ filename = `records-${this.generateId()}.csv`, subkey = '_source', headers = true }) {
    super.writeToCSV({ filename, subkey, headers });
  }

  // writeToCSV({ filename, subkey, headers }) {
  //   const stream = fs.createWriteStream(`${Config.CSV_DIR}/${filename}`, { encoding: 'utf8' });
  //   const data = subkey ? this.map(obj => obj[subkey]) : this;

  //   fastCSV.writeToStream(stream, data, { headers }).on('error', err => console.error(err));
  // }

};
