// DeviceGroup.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class DeviceGroup extends BaseObject {
  constructor(deviceGroup = {}) {
    super();
    Object.keys(deviceGroup).forEach((key) => this[key] = deviceGroup[key]);
  }
};
