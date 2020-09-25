// BaseObjectSet.model.js

const fs = require('fs');
const fastCSV = require('fast-csv');
const { parse } = require('json2csv');
const Utils = require('../../utils/BaseUtil.util.js');
const { Config } = require('../../constants/Global.constants');

module.exports = class BaseObjectSet extends Array {
  constructor(baseObjects) {
    super();
    baseObjects.forEach((baseObject) => this.push(baseObject));
  }

  toString() {
    return JSON.stringify(this, null, 2);
  }

  print() {
    this.forEach((baseObject) => baseObject.print());
  }

  toCSV({ header = true, subkey }) {
    const data = subkey ? this.map((obj) => obj[subkey]) : this;
    const fields = Object.keys(data[0]);

    return parse(data, { header, fields });
  }

  printCSV(options = {}) {
    console.info(this.toCSV(options));
  }

  writeToCSV({ filename, subkey, headers }) {
    const stream = fs.createWriteStream(`${Config.CSV_DIR}/${filename}`, { encoding: 'utf8' });
    const data = subkey ? this.map((obj) => obj[subkey]) : this;

    fastCSV.writeToStream(stream, data, { headers }).on('error', (err) => console.error(err));
  }

  generateId(params) {
    return Utils.generateId(params);
  }
};
