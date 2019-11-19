// ActivityMap.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class ActivityMap extends BaseObject {
  constructor(activityMap = {}) {
    super();
    this.display = activityMap.display;
    this.name = this.display;
    this.oid = activityMap.oid;
    this.id = this.oid;
    this.description = activityMap.description;
  }
};
