// DeviceActivity.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class DeviceActivity extends BaseObject {
  constructor(deviceActivity = {}) {
    super(deviceActivity);

    /* TODO */
    Object.keys(deviceActivity).forEach(key => (this[key] = deviceActivity[key]));
  }
};
