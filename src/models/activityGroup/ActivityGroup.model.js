// ActivityGroup.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class ActivityGroup extends BaseObject {
  constructor(activityGroup = {}) {
    super();
    Object.keys(activityGroup).forEach((key) => this[key] = activityGroup[key]);
  }
};
