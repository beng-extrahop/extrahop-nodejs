// Alert.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const AlertSet = require('../models/alert/AlertSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');

//const Strings = require('../constants/Alert.constants');

module.exports = class AlertCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Global Search
  // -------------------------------------

  find(params = {}) {
    return new AlertSet(this.filter(this.getAlerts(), params) || []);
  }

  findDashboards(alert) {
    return new DashboardSet(this.getAlertDashboards(alert) || []);
  }

  // -------------------------------------
  // API Functions
  // -------------------------------------

  getAlerts() {
    return this.process(this.appliance.getAlerts(), 'activity groups');
  }

}
