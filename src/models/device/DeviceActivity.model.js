// DeviceActivity.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class DeviceActivity extends BaseObject {
  constructor(deviceActivity = {}) {
    super();
    Object.keys(deviceActivity).forEach((key) => this[key] = deviceActivity[key]);
  }
};
