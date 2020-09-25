// Application.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Application = require('../models/application/Application.model');
const ApplicationSet = require('../models/application/ApplicationSet.model');
const ApplicationActivity = require('../models/application/ApplicationActivity.model');
const ApplicationActivitySet = require('../models/application/ApplicationActivitySet.model');
const AlertSet = require('../models/alert/AlertSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');

const OBJECT_NAME = 'application';

module.exports = class ApplicationCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(application) {
    return application
      ? new Application(this.getApplication(application))
      : new ApplicationSet(this.getApplications());
  }

  getActivity(application) {
    return new ApplicationActivitySet(this.getApplicationActivity(application));
  }

  getAlerts(application) {
    return new AlertSet(this.getApplicationAlerts(application));
  }

  getDashboards(application) {
    return new DashboardSet(this.getApplicationDashboards(application));
  }

  create(data) {
    return this.postApplication(new Application(data));
  }

  update(application, data) {
    return this.patchApplication(application, data);
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getApplications(params = {}) {
    return this.process(this.appliance.getApplications(params), OBJECT_NAME);
  }

  getApplication(application) {
    return this.process(this.appliance.getApplication(application.id), OBJECT_NAME);
  }

  postApplication(application) {
    return this.process(this.appliance.postApplication(application), OBJECT_NAME);
  }

  patchApplication(application, data) {
    return this.process(this.appliance.patchApplication(application.id, data), OBJECT_NAME);
  }

  // -------------------------------------
  // Activity
  // -------------------------------------

  getApplicationActivity(application) {
    return this.process(this.appliance.getApplicationActivity(application.id), `${OBJECT_NAME} activity`);
  }

  // -------------------------------------
  // Alerts
  // -------------------------------------

  getApplicationAlerts(application) {
    return this.process(this.appliance.getApplicationAlerts(application.id), `${OBJECT_NAME} alerts`);
  }

  postApplicationAlerts(application, assign = [], unassign = []) {
    return this.process(this.appliance.postApplicationAlerts(application.id, { assign, unassign }), `${OBJECT_NAME} alerts`);
  }

  postApplicationAlert(application, alert) {
    return this.process(this.appliance.postApplicationAlert(application.id, alert.id), `${OBJECT_NAME} alert`);
  }

  deleteApplicationAlert(application, alert) {
    return this.process(this.appliance.deleteApplicationAlert(application.id, alert.id), `${OBJECT_NAME} alert`);
  }

  // -------------------------------------
  // Dashboards
  // -------------------------------------

  getApplicationDashboards(application) {
    return this.process(this.appliance.getApplicationDashboards(application.id), `${OBJECT_NAME} dashboards`);
  }
};
