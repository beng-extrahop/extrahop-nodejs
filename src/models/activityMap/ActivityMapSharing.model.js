// ActivityMapSharing.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class ActivityMapSharing extends BaseObject {
  constructor(activityMapSharing = {}) {
    super();
    Object.keys(activityMapSharing).forEach((key) => this[key] = activityMapSharing[key]);
  }
};
