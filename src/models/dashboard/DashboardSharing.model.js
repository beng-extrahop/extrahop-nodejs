// DashboardSharing.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class DashboardSharing extends BaseObject {
  constructor(dashboardSharing = {}) {
    super(dashboardSharing);
    this.anyone = dashboardSharing.anyone;
    this.users = dashboardSharing.users;
    this.groups = dashboardSharing.groups;
  }
}
