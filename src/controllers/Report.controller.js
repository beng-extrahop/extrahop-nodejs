// Report.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Report = require('../models/report/Report.model');
const ReportSet = require('../models/report/ReportSet.model');

const OBJECT_NAME = 'report';

module.exports = class ReportCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(report) {
    return report ? new Report(this.getReport(report)) : new ReportSet(this.getReports());
  }

  update(report, data) {
    return this.patchReport(report, data);
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getReports() {
    return this.process(this.appliance.getReports(), OBJECT_NAME);
  }

  getReport(report) {
    return this.process(this.appliance.getReport(report.id), OBJECT_NAME);
  }

  patchReport(report, data) {
    return this.process(this.appliance.patchReport(report, data), OBJECT_NAME);
  }
};
