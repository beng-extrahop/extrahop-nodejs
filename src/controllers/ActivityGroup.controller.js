// ActivityGroup.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const ActivityGroupSet = require('../models/activityGroup/ActivityGroupSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');

module.exports = class ActivityGroupCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get() {
    return new ActivityGroupSet(...this.getActivityGroups());
  }

  getDashboards(activityGroup) {
    return new DashboardSet(...this.getActivityGroupDashboards(activityGroup));
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getActivityGroups() {
    return this.process(this.appliance.getActivityGroups(), 'activity groups');
  }

  getActivityGroupDashboards(activityGroup) {
    return this.process(
      this.appliance.getActivityGroupDashboards(activityGroup.id),
      'activity group dashboards'
    );
  }
};
