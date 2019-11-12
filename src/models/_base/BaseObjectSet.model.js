// BaseObjectSet.model.js

const Utils = require('../../utils/BaseUtil.util.js');
const { Config } = require('../../constants/Global.constants');

const fastCSV = require('fast-csv');
const fs = require('fs');

require('events').EventEmitter.defaultMaxListeners = 128;
process.setMaxListeners(Infinity);

module.exports = class BaseObjectSet extends Array {
  constructor(baseObjects = []) {
    super();
  }

  toString({ format }) {
    return format ? JSON.stringify(this, null, 2) : JSON.stringify(this);
  }

  print() {
    this.forEach(baseObject => baseObject.print());
  }

  toCSV(subkey, headers = true) {
    return fastCSV.write((subkey ? this.map(obj => obj[subkey]) : this), { headers });
  }

  writeToCSV(filename, subkey) {
    const stream = fs.createWriteStream(Config.CSV_DIR + '/' + filename, { encoding: 'utf8' });
    const data = subkey ? this.map(obj => obj[subkey]) : this;

    fastCSV.writeToStream(stream, data).on('error', err => console.error(err));
  }

  generateId(params) {
    return Utils.generateId(params);
  }

  // -------------------------------------
  // Array Defaults
  // -------------------------------------

  * [Symbol.iterator] () {
    let position = 0;

    while (position < this.length) {
      if (position === this.length) {
        return "Done!"
      } else {
        yield `${this[position++]} is the Object at position ${position}`;
      }
    }
  }

  static get [Symbol.species] () {
    return Array;
  }
}
