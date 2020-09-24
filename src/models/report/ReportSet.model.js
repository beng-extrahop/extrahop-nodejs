// ReportSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Report = require('./Report.model');

module.exports = class ReportSet extends BaseObjectSet {
  constructor(reports = []) {
    super(Array.from(reports).map((report) => new Report(report)));
  }
};
