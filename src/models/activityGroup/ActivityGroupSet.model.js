// ActivityGroupSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const ActivityGroup = require('./ActivityGroup.model');

module.exports = class ActivityGroupSet extends BaseObjectSet {
  constructor(activityGroups = []) {
    super(Array.from(activityGroup).map((activityGroup) => new ActivityGroup(activityGroup)));
  }
};
