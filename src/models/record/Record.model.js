// Record.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Record extends BaseObject {
  constructor(record = {}) {
    super();
    Object.keys(record).forEach((key) => this[key] = record[key]);
  }
};
