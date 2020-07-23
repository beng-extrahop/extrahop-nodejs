// ActivityGroupSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const ActivityGroup = require('../../models/activityGroup/ActivityGroup.model');

module.exports = class ActivityGroupSet extends BaseObjectSet {
  constructor(activityGroups = []) {
    super(activityGroups.map(activityGroup => new ActivityGroup(activityGroup)));
  }

  writeToCSV({ filename = `activityGroups-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
