// Record.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Record extends BaseObject {
  constructor(record = {}) {
    super(record);
    this._id = record._id;
    this._index = record._index;
    this._score = record._score;
    this._source = record._source;
  }
};
