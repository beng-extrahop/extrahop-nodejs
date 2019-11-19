// BaseObjectSet.model.js

const Utils = require('../../utils/BaseUtil.util.js');
const { Config } = require('../../constants/Global.constants');

const { parse } = require('json2csv');
const fastCSV = require('fast-csv');
const fs = require('fs');

module.exports = class BaseObjectSet extends Array {
  toString(format = true) {
    return JSON.stringify(this, null, format ? 2 : null);
  }

  print() {
    this.forEach(baseObject => baseObject.print());
  }

  toCSV({ header = true, subkey }) {
    const data = subkey ? this.map(obj => obj[subkey]) : this;
    const fields = Object.keys(data[0]);

    return parse(data, { header, fields });
  }

  printCSV(options = {}) {
    console.info(this.toCSV(options));
  }

  writeToCSV(filename, subkey, headers = true) {
    const stream = fs.createWriteStream(`${Config.CSV_DIR}/${filename}`, { encoding: 'utf8' });
    const data = subkey ? this.map(obj => obj[subkey]) : this;

    fastCSV.writeToStream(stream, data, { headers }).on('error', err => console.error(err));
  }

  generateId(params) {
    return Utils.generateId(params);
  }
};
