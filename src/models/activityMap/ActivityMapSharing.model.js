// ActivityMapSharing.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class ActivityMapSharing extends BaseObject {
  constructor(activityMapSharing = {}) {
    super(activityMapSharing);
    this.anyone = activityMapSharing.anyone;
    this.users = activityMapSharing.users;
    this.groups = activityMapSharing.groups;
  }
}
