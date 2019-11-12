// BaseObject.model.js

const fastCSV = require('fast-csv');
const fs = require('fs');

module.exports = class BaseObject extends Object {
  constructor(baseObject = {}) {
    super();
  }

  print() {
    console.info('\n' + this.toString());
  }

  printCSV(start, end) {
    console.info(this.toCSV(start, end));
  }

  toString(format = false) {
    return JSON.stringify(this, null, format ? 2 : null);
  }

  toCSV(subkey) {
    return fastCSV.write([ this[subkey] || this ], { headers: true });
  }

  writeToCSV({ filename, subkey }) {
    this.toCSV(subkey, headers).pipe(fs.createWriteStream(filename));
  }
}
