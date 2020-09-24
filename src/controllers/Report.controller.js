// Report.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Report = require('../models/report/Report.model');
const ReportSet = require('../models/report/ReportSet.model');

module.exports = class ReportCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(report) {
    return report ? new Report(this.getReport(report)) : new ReportSet(this.getReports());
  }

  update(report, data) {
    return this.patchReport(report, data);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getReports() {
    return this.process(this.appliance.getReports(), 'reports');
  }

  getReport(report) {
    return this.process(this.appliance.getReport(report.id), 'report');
  }

  patchReport(report, data) {
    return this.process(this.appliance.patchReport(report, data), 'report');
  }
};
