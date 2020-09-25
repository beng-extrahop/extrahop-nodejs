// ActivityMap.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const ActivityMap = require('../models/activityMap/ActivityMap.model');
const ActivityMapSet = require('../models/activityMap/ActivityMapSet.model');
const ActivityMapQuery = require('../models/activityMap/ActivityMapQuery.model');
const ActivityMapSharing = require('../models/activityMap/ActivityMapSharing.model');

const OBJECT_NAME = 'activity map';

module.exports = class ActivityMapCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(activityMap) {
    return activityMap
      ? new ActivityMap(this.getActivityMap(activityMap))
      : new ActivityMapSet(this.getActivityMaps());
  }

  getSharing(activityMap) {
    return new ActivityMapSharing(this.getActivityMapSharing(activityMap));
  }

  create(data) {
    return this.postActivityMap(this.build(data));
  }

  query(data, activityMap) {
    return activityMap
      ? this.postActivityMapQuery(new ActivityMapQuery(data), activityMap)
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
  // Defaults
  // -------------------------------------

  getActivityMaps() {
    return this.process(this.appliance.getActivityMaps(), OBJECT_NAME);
  }

  getActivityMap(activityMap) {
    return this.process(this.appliance.getActivityMap(activityMap.id), OBJECT_NAME);
  }

  postActivityMap(activityMap) {
    return this.process(this.appliance.postActivityMap(activityMap), OBJECT_NAME);
  }

  deleteActivityMap(activityMap) {
    return this.process(this.appliance.deleteActivityMap(activityMap.id), OBJECT_NAME);
  }

  patchActivityMap(activityMap, data) {
    return this.process(this.appliance.patchActivityMap(activityMap.id, data), OBJECT_NAME);
  }

  // -------------------------------------
  // Query
  // -------------------------------------

  postActivityMapsQuery(query) {
    return this.process(this.appliance.postActivityMapsQuery(query), `${OBJECT_NAME} query`);
  }

  postActivityMapQuery(activityMap, query) {
    return this.process(this.appliance.postActivityMapQuery(activityMap.id, query), `${OBJECT_NAME} query`);
  }

  // -------------------------------------
  // Sharing
  // -------------------------------------

  getActivityMapSharing(activityMap) {
    return new ActivityMapSharing(this.process(this.appliance.getActivityMapSharing(activityMap.id), OBJECT_NAME));
  }

  patchActivityMapSharing(activityMap, sharing) {
    return this.process(this.appliance.patchActivityMapSharing(activityMap.id, sharing), `${OBJECT_NAME} sharing`);
  }

  putActivityMapSharing(activityMap, sharing) {
    return this.process(this.appliance.putActivityMapSharing(activityMap.id, sharing), `${OBJECT_NAME} sharing`);
  }
};
