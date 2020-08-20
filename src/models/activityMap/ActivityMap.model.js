// ActivityMap.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class ActivityMap extends BaseObject {
  constructor(activityMap = {}) {
    super();
    Object.keys(activityMap).forEach((key) => this[key] = activityMap[key]);
  }
};
