// Record.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

const Parser = require('json2csv').Parser;

module.exports = class Record extends BaseObject {
  constructor(record = {}) {
    super();
    this._id = record._id;
    this._index = record._index;
    this._score = record._score;
    this._source = record._source;
  }

  printCSV(start, end) {
    console.log(this.toCSV(start, end));
  }

  toCSV(fields = Object.keys(this._source)) {
    const parser = new Parser({ header: false, fields: fields, delimiter: ';' });

    try {
      return parser.parse(this._source, fields);
    }
    catch ( err ) {
      console.error(err);
    }
  }
}
