// DeviceGroupSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const DeviceGroup = require('./DeviceGroup.model');

module.exports = class DeviceGroupSet extends BaseObjectSet {
  constructor(deviceGroups = []) {
    super(Array.from(deviceGroups).map((deviceGroup) => new DeviceGroup(deviceGroup)));
  }
};
