// DeviceGroup.model.js

const BaseObject = require('../../models/base/BaseObject.model');

module.exports = class DeviceGroup extends BaseObject {
  constructor(deviceGroup = {}) {
    super();
    this.mod_time = deviceGroup.mod_time;
    this.description = deviceGroup.description;
    this.id = deviceGroup.id;
    this.name = deviceGroup.name;
    this.include_custom_devices = deviceGroup.include_custom_devices;
    this.dynamic = deviceGroup.dynamic;
    this.field = deviceGroup.field;
    this.value = deviceGroup.value;
  }
}
