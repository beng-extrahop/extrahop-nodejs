// ActivityGroup.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const ActivityGroupSet = require('../models/activityGroups/ActivityGroupSet.model');
const DashboardSet = require('../models/dashboards/DashboardSet.model');

//const Strings = require('../constants/ActivityGroup.constants');

module.exports = class ActivityGroupCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Global Search
  // -------------------------------------

  findAll() {
    return new ActivityGroupSet(this.getActivityGroups());
  }

  findAllDashboards(activityGroup) {
    return new DashboardSet(this.getActivityGroupDashboards(activityGroup));
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
