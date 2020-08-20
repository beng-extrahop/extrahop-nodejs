// ActivityMapSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const ActivityMap = require('./ActivityMap.model');

module.exports = class ActivityMapSet extends BaseObjectSet {
  constructor(activityMaps = []) {
    super();
    activityMaps.forEach((activityMap) => this.push(new ActivityMap(activityMap)));
  }

  writeToCSV({ filename = `activityMaps-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
