// BaseObjectSet.model.js

const fastCSV = require('fast-csv');
const fs = require('fs');

module.exports = class BaseObjectSet extends Array {
  constructor(baseObjects = []) {
    super();
  }

  print() {
    this.forEach(baseObject => baseObject.print());
  }

  toString({ format }) {
    return format ? JSON.stringify(this, null, 2) : JSON.stringify(this);
  }

  toCSV(subkey) {
    return fastCSV.write((subkey ? this.map(obj => obj[subkey]) : this), { headers: true });
  }

  writeToCSV({ filename, subkey }) {
    this.toCSV(subkey).pipe(fs.createWriteStream(filename));
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
