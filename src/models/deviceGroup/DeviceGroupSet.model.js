// DeviceGroupSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const DeviceGroup = require('./DeviceGroup.model');

module.exports = class DeviceGroupSet extends BaseObjectSet {
  constructor(deviceGroups = []) {
    super();
    deviceGroups.forEach((deviceGroup) => this.push(new DeviceGroup(deviceGroup)));
  }

  writeToCSV({ filename = `deviceGroups-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
