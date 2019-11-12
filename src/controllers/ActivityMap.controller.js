// ActivityMap.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const ActivityMapSet = require('../models/activityMap/ActivityMapSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');

//const Strings = require('../constants/ActivityMap.constants');

module.exports = class ActivityMapCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Global Search
  // -------------------------------------

  find(params = {}) {
    return new ActivityMapSet(this.filter(this.getActivityMaps(), params) || []);
  }

  findDashboards(activityMap) {
    return new DashboardSet(this.getActivityMapDashboards(activityMap) || []);
  }

  // -------------------------------------
  // API Functions
  // -------------------------------------

  getActivityMaps() {
    return this.process(this.appliance.getActivityMaps(), 'activity groups');
  }

  getActivityMapDashboards(activityMap) {
    return this.process(this.appliance.getActivityMapDashboards(activityMap.id), 'related dashboards');
  }
}
