// BaseObject.model.js

const { Config } = require('../../constants/Global.constants');

const { parse } = require('json2csv');
const fastCSV = require('fast-csv');
const fs = require('fs');

module.exports = class BaseObject {
  toString({ format = true } = {}) {
    return JSON.stringify(this, null, format ? 2 : null);
  }

  print() {
    console.info(this.toString());
  }

  toCSV({ header = true, subkey } = {}) {
    const data = subkey ? this[subkey] : this;
    const fields = Object.keys(data);

    return parse(data, { header, fields });
  }

  printCSV(options = {}) {
    console.info(this.toCSV(options));
  }

  writeToCSV({ filename, subkey }) {
    const stream = fs.createWriteStream(`${Config.CSV_DIR}/${filename}`, { encoding: 'utf8' });
    const data = subkey ? this[subkey] : this;

    fastCSV.writeToStream(stream, data, { headers: true }).on('error', err => console.error(err));
    // fastCSV.write([this[subkey] || this], { headers }).pipe(fs.createWriteStream(filename));
  }
};
