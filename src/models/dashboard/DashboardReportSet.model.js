// DashboardReportSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const DashboardReport = require('./DashboardReport.model');

module.exports = class DashboardReportSet extends BaseObjectSet {
  constructor(dashboardReports = []) {
    super(Array.from(dashboardReports).map((dashboardReport) => new DashboardReport(dashboardReport)));
  }
};
