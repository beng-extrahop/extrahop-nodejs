// BaseObject.model.js

const { parse } = require('json2csv');

module.exports = class BaseObject {
  print() {
    console.log('\n' + this.toString());
  }

  printCSV(start, end) {
    console.log(this.toCSV(start, end));
  }

  toString(format = false) {
    return JSON.stringify(this, null, format ? 2 : null);
  }

  toCSV(subkey) {
    return fastCSV.write((this[subkey] || this), { headers: true });
  }

  writeToCSV({ filename, subkey }) {
    this.toCSV(subkey, headers).pipe(fs.createWriteStream(filename));
  }
}
