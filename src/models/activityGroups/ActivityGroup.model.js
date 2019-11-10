// ActivityGroup.model.js

const BaseObject = require('../../models/base/BaseObject.model');

module.exports = class ActivityGroup extends BaseObject {
  constructor(activityGroup = {}) {
    super();
    this.display = activityGroup.display;
    this.name = this.display;
    this.oid = activityGroup.oid;
    this.id = this.oid;
    this.description = activityGroup.description;
  }
}
