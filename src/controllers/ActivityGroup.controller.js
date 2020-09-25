// ActivityGroup.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const ActivityGroup = require('../models/activityGroup/ActivityGroup.model');
const ActivityGroupSet = require('../models/activityGroup/ActivityGroupSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');

const OBJECT_NAME = 'activity group';

module.exports = class ActivityGroupCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(activityGroup) {
    return activityGroup
      ? new ActivityGroup(this.getActivityGroup(activityGroup))
      : new ActivityGroupSet(this.getActivityGroups());
  }

  getDashboards(activityGroup) {
    return new DashboardSet(this.getActivityGroupDashboards(activityGroup));
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getActivityGroups() {
    return this.process(this.appliance.getActivityGroups(), OBJECT_NAME);
  }

  getActivityGroup(activityGroup) {
    return this.process(this.appliance.getActivityGroups().filter((x) => x.id == activityGroup.id), OBJECT_NAME);
  }

  getActivityGroupDashboards(activityGroup) {
    return this.process(this.appliance.getActivityGroupDashboards(activityGroup.id), `${OBJECT_NAME} dashboards`);
  }
};
