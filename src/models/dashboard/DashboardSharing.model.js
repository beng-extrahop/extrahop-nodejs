// DashboardSharing.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class DashboardSharing extends BaseObject {
  constructor(dashboardSharing = {}) {
    super();
    Object.keys(dashboardSharing).forEach((key) => this[key] = dashboardSharing[key]);
  }
};
