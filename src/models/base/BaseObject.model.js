// BaseObject.model.js

const { parse } = require('json2csv');

module.exports = class BaseObject extends Object {
  constructor(baseObject = {}) {
    super(baseObject);
  }

  print() {
    console.log('\n' + this.toString());
  }

  printCSV(start, end) {
    console.log(this.toCSV(start, end));
  }

  toString({ format }) {
    return format ? JSON.stringify(this, null, 2) : JSON.stringify(this);
  }

  toCSV(subkey) {
    return fastCSV.write((this[subkey] || this), { headers: true });
  }

  writeToCSV({ filename, subkey }) {
    this.toCSV(subkey, headers).pipe(fs.createWriteStream(filename));
  }
}
