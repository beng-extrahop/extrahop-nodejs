// Report.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Report extends BaseObject {
  constructor(report = {}) {
    super();
    Object.keys(report).forEach((key) => this[key] = report[key]);
  }
};
