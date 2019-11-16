// ActivityMap.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const ActivityMap = require('../models/activityMap/ActivityMap.model');
const ActivityMapSet = require('../models/activityMap/ActivityMapSet.model');
const ActivityMapQuery = require('../models/activityMap/ActivityMapQuery.model');
const ActivityMapSharing = require('../models/activityMap/ActivityMapSharing.model');

module.exports = class ActivityMapCtrl extends BaseCtrl {

  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(activityMap) {
    return activityMap ? new ActivityMap(this.getActivityMap(activityMap)) : new ActivityMapSet(...this.getActivityMaps());
  }

  getSharing(activityMap) {
    return new ActivityMapSharing(this.getActivityMapSharing(activityMap));
  }

  create(data) {
    return this.postActivityMap(this.build(data));
  }

  query(data, activityMap) {
    return activityMap ?
        this.postActivityMapQuery(new ActivityMapQuery(data), activityMap)
      : this.postActivityMapsQuery(new ActivityMapQuery(data));
  }

  update(activityMap, data) {
    return this.patchActivityMap(activityMap, data);
  }

  delete(activityMap) {
    return this.deleteActivityMap(activityMap);
  }

  build(data) {
    return new ActivityMap(data);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getActivityMaps() {
    return this.process(this.appliance.getActivityMaps(), 'activity maps');
  }

  getActivityMap(activityMap) {
    return this.process(this.appliance.getActivityMap(activityMap.id), 'activity map');
  }

  postActivityMap(activityMap) {
    return this.process(this.appliance.postActivityMap(activityMap), 'activity map');
  }

  deleteActivityMap(activityMap) {
    return this.process(this.appliance.deleteActivityMap(activityMap.id), 'activity map');
  }

  patchActivityMap(activityMap, data) {
    return this.process(this.appliance.patchActivityMap(activityMap.id, data), 'activity map');
  }

  // -------------------------------------
  // Query Functions
  // -------------------------------------

  postActivityMapsQuery(query) {
    return this.process(this.appliance.postActivityMapsQuery(query), 'activity maps query');
  }

  postActivityMapQuery(activityMap, query) {
    return this.process(this.appliance.postActivityMapQuery(activityMap.id, query), 'activity map query');
  }

  // -------------------------------------
  // Sharing Functions
  // -------------------------------------

  getActivityMapSharing(activityMap) {
    return new ActivityMapSharing(this.process(this.appliance.getActivityMapSharing(activityMap.id), 'activity map'));
  }

  patchActivityMapSharing(activityMap, sharing) {
    return this.process(this.appliance.patchActivityMapSharing(activityMap.id, sharing), 'activity map sharing');
  }

  putActivityMapSharing(activityMap, sharing) {
    return this.process(this.appliance.putActivityMapSharing(activityMap.id, sharing), 'activity map sharing');
  }
}
