// ActivityGroupSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const ActivityGroup = require('../../models/activityGroup/ActivityGroup.model');

module.exports = class ActivityGroupSet extends BaseObjectSet {
  constructor(activityGroups = []) {
    super();
    activityGroups.forEach(activityGroup => this.push(new ActivityGroup(activityGroup)));
  }
}
