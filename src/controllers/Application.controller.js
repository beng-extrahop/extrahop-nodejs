// Application.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Application = require('../models/application/Application.model');
const ApplicationSet = require('../models/application/ApplicationSet.model');
const ApplicationActivity = require('../models/application/ApplicationActivity.model');
const AlertSet = require('../models/alert/AlertSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');

module.exports = class ApplicationCtrl extends BaseCtrl {

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(application) {
    return application ? new Application(this.getApplication(application)) : new ApplicationSet(...this.getApplications());
  }

  getActivity(application) {
    return new ApplicationActivity(this.getApplicationActivity(application));
  }

  getAlerts(application) {
    return new AlertSet(...this.getApplicationAlerts(application));
  }

  getDashboards(application) {
    return new DashboardSet(...this.getApplicationDashboards(application));
  }

  create(data) {
    return this.postApplication(this.build(data));
  }

  update(application, data) {
    return this.patchApplication(application, data);
  }

  build(data) {
    return new Application(data);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getApplications() {
    return this.process(this.appliance.getApplications(), 'applications');
  }

  getApplication(application) {
    return this.process(this.appliance.getApplication(application.id), 'application');
  }

  postApplication(application) {
    return this.process(this.appliance.postApplication(application), 'application');
  }

  patchApplication(application, data) {
    return this.process(this.appliance.patchApplication(application.id, data), 'application');
  }

  // -------------------------------------
  // Activity Functions
  // -------------------------------------

  getApplicationActivity(application) {
    return this.process(this.appliance.getApplicationActivity(application.id), 'application activity');
  }

  // -------------------------------------
  // Alert Functions
  // -------------------------------------

  getApplicationAlerts(application) {
    return this.process(this.appliance.getApplicationAlerts(application.id), 'application alerts');
  }

  postApplicationAlerts(application, assign = [], unassign = []) {
    return this.process(this.appliance.postApplicationAlerts(application.id, { assign, unassign }), 'application alerts');
  }

  postApplicationAlert(application, alert) {
    return this.process(this.appliance.postApplicationAlert(application.id, alert.id), 'application alert');
  }

  deleteApplicationAlert(application, alert) {
    return this.process(this.appliance.deleteApplicationAlert(application.id, alert.id), 'application alert');
  }

  // -------------------------------------
  // Dashboard Functions
  // -------------------------------------

  getApplicationDashboards(application) {
    return this.process(this.appliance.getApplicationDashboards(application.id), 'application dashboards');
  }
};
