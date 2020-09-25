// Dashboard.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Dashboard = require('../models/dashboard/Dashboard.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');
const DashboardSharing = require('../models/dashboard/DashboardSharing.model');
const ReportSet = require('../models/report/ReportSet.model');

const OBJECT_NAME = 'dashboard';

module.exports = class DashboardCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(dashboard) {
    return dashboard
      ? new Dashboard(this.getDashboard(dashboard))
      : new DashboardSet(this.getDashboards());
  }

  getSharing(dashboard) {
    return new DashboardSharing(this.getDashboardSharing(dashboard));
  }

  getReports(dashboard) {
    return new ReportSet(this.getDashboardReports(dashboard));
  }

  create(data) {
    return this.postDashboard(new Dashboard(data));
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
    return new ActivityMap(data);
  }

  // -------------------------------------
  // Utility
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
  // Sharing: Anyone
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
  // Sharing: Users
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
  // Sharing: Groups
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
  // Defaults
  // -------------------------------------

  getDashboards() {
    return this.process(this.appliance.getDashboards(), OBJECT_NAME);
  }

  getDashboard(dashboard) {
    return this.process(this.appliance.getDashboard(dashboard.id), OBJECT_NAME);
  }

  deleteDashboard(dashboard) {
    return this.process(this.appliance.deleteDashboard(dashboard.id), OBJECT_NAME);
  }

  patchDashboard(dashboard, data) {
    return this.process(this.appliance.patchDashboard(dashboard.id, data), OBJECT_NAME);
  }

  getDashboardReports(dashboard) {
    return this.process(this.appliance.getDashboardReports(dashboard.id), `${OBJECT_NAME} report`);
  }

  getDashboardSharing(dashboard) {
    return this.process(this.appliance.getDashboardSharing(dashboard.id), `${OBJECT_NAME} sharing`);
  }

  patchDashboardSharing(dashboard, sharing) {
    return this.process(this.appliance.patchDashboardSharing(dashboard.id, sharing), `${OBJECT_NAME} sharing`);
  }

  putDashboardSharing(dashboard, sharing) {
    return this.process(this.appliance.putDashboardSharing(dashboard.id, sharing), `${OBJECT_NAME} sharing`);
  }
};
