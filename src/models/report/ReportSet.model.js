// ReportSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Report = require('../../models/report/Report.model');

module.exports = class ReportSet extends BaseObjectSet {
  constructor(reports = []) {
    super();
    reports.forEach(report => this.push(new Report(report)));
  }

  writeToCSV({ filename = `reports-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
