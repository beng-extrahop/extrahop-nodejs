// Dashboard.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Dashboard = require('../models/dashboard/Dashboard.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');
const DashboardSharing = require('../models/dashboard/DashboardSharing.model');
const ReportSet = require('../models/report/ReportSet.model');

module.exports = class DashboardCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(dashboard) {
    return dashboard ? new Dashboard(this.getDashboard(dashboard)) : new DashboardSet(...this.getDashboards());
  }

  getSharing(dashboard) {
    return new DashboardSharing(this.getDashboardSharing(dashboard));
  }

  getReports(dashboard) {
    return new ReportSet(...this.getDashboardReports(dashboard));
  }

  create(data) {
    return this.postDashboard(this.build(data));
  }

  update(dashboard, data) {
    return this.patchDashboard(dashboard, data);
  }

  updateSharing(dashboard, sharing) {
    return this.patchDashboardSharing(dashboard, sharing);
  }

  delete(dashboard) {
    return this.deleteDashboard(dashboard);
  }

  build(data) {
    return new Dashboard(data);
  }

  // -------------------------------------
  // Modify Dashboards
  // -------------------------------------

  transferOwnership(dashboard, username) {
    return this.update(dashboard, { owner: username });
  }

  makePublic(dashboard) {
    return this.addAnyoneView(dashboard);
  }

  makePrivate(dashboard) {
    return this.removeAnyone(dashboard);
  }

  // -------------------------------------
  // Anyone Sharing
  // -------------------------------------

  updateAnyoneSharing(dashboard, permission) {
    return this.updateSharing(dashboard, { anyone: permission });
  }

  addAnyoneView(dashboard) {
    return this.updateAnyoneSharing(dashboard, 'viewer');
  }

  addAnyoneEdit(dashboard) {
    return this.updateAnyoneSharing(dashboard, 'editor');
  }

  removeAnyone(dashboard) {
    return this.updateAnyoneSharing(dashboard, null);
  }

  // -------------------------------------
  // User Sharing
  // -------------------------------------

  updateUserSharing(dashboard, username, permission) {
    return this.updateSharing(dashboard, { users: { [username]: permission } });
  }

  addUserView(dashboard, username) {
    return this.updateUserSharing(dashboard, username, 'viewer');
  }

  addUserEdit(dashboard, username) {
    return this.updateUserSharing(dashboard, username, 'editor');
  }

  removeUser(dashboard, username) {
    return this.updateUserSharing(dashboard, username, null);
  }

  // -------------------------------------
  // Group Sharing
  // -------------------------------------

  updateGroupSharing(dashboard, group, permission) {
    return this.updateSharing(dashboard, { groups: { [group.id]: permission } });
  }

  addGroupView(dashboard, group) {
    return this.updateGroupSharing(dashboard, group, 'viewer');
  }

  addGroupEdit(dashboard, group) {
    return this.updateGroupSharing(dashboard, group, 'editor');
  }

  removeGroup(dashboard, group) {
    return this.updateGroupSharing(dashboard, group, null);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getDashboards() {
    return this.process(this.appliance.getDashboards(), 'dashboards').map(x => new Dashboard(x));
  }

  getDashboard(dashboard) {
    return this.process(this.appliance.getDashboard(dashboard.id), 'dashboard');
  }

  deleteDashboard(dashboard) {
    return this.process(this.appliance.deleteDashboard(dashboard.id), 'dashboard');
  }

  patchDashboard(dashboard, data) {
    return this.process(this.appliance.patchDashboard(dashboard.id, data), 'dashboard');
  }

  // -------------------------------------
  // Report Functions
  // -------------------------------------

  getDashboardReports(dashboard) {
    return this.process(this.appliance.getDashboardReports(dashboard.id), 'dashboard reports');
  }

  // -------------------------------------
  // Sharing Functions
  // -------------------------------------

  getDashboardSharing(dashboard) {
    return this.process(this.appliance.getDashboardSharing(dashboard.id), 'dashboard sharing');
  }

  patchDashboardSharing(dashboard, sharing) {
    return this.process(this.appliance.patchDashboardSharing(dashboard.id, sharing), 'dashboard sharing');
  }

  putDashboardSharing(dashboard, sharing) {
    return this.process(this.appliance.putDashboardSharing(dashboard.id, sharing), 'dashboard sharing');
  }
};
