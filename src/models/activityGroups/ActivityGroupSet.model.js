// ActivityGroupSet.model.js

const BaseObjectSet = require('../../models/base/BaseObjectSet.model');
const ActivityGroup = require('../../models/activityGroups/ActivityGroup.model');

module.exports = class ActivityGroupSet extends BaseObjectSet {
  constructor(activityGroups = []) {
    super();
    activityGroups.forEach(activityGroup => this.push(new ActivityGroup(activityGroup)));
  }
}
