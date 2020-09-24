// ActivityMapSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const ActivityMap = require('./ActivityMap.model');

module.exports = class ActivityMapSet extends BaseObjectSet {
  constructor(activityMaps = []) {
    super(Array.from(activityMaps).map((activityMap) => new ActivityMap(activityMap)));
  }
};
