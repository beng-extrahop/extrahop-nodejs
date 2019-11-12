// Report.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Report extends BaseObject {
  constructor(report = {}) {
    super();
    /* TODO */
    Object.keys(report).forEach(key => this[key] = report[key]);
  }
}
