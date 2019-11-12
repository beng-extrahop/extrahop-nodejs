// ActivityMapSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const ActivityMap = require('../../models/activityMap/ActivityMap.model');

module.exports = class ActivityMapSet extends BaseObjectSet {
  constructor(activityMaps = []) {
    super(activityMaps);
    activityMaps.forEach(activityMap => this.push(new ActivityMap(activityMap)));
  }

  writeToCSV({ filename = `activityMaps-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}
