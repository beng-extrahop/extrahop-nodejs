// ActivityGroup.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const ActivityGroupSet = require('../models/activityGroup/ActivityGroupSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');

//const Strings = require('../constants/ActivityGroup.constants');

module.exports = class ActivityGroupCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Global Search
  // -------------------------------------

  get(params = {}) {
    return new ActivityGroupSet(this.filter(this.getActivityGroups(), params) || []);
  }

  getDashboards(activityGroup) {
    return new DashboardSet(this.getActivityGroupDashboards(activityGroup) || []);
  }

  // -------------------------------------
  // API Functions
  // -------------------------------------

  getActivityGroups() {
    return this.process(this.appliance.getActivityGroups(), 'activity groups');
  }

  getActivityGroupDashboards(activityGroup) {
    return this.process(this.appliance.getActivityGroupDashboards(activityGroup.id), 'related dashboards');
  }
}
