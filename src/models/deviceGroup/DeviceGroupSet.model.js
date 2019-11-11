// DeviceGroupSet.model.js

const BaseObjectSet = require('../../models/_bas/BaseObjectSet.model');
const DeviceGroup = require('../../models/deviceGroup/DeviceGroup.model');

module.exports = class DeviceGroupSet extends BaseObjectSet {
  constructor(deviceGroups = []) {
    super();
    deviceGroups.forEach(deviceGroup => this.push(new DeviceGroup(deviceGroup)));
  }

  writeToCSV(filename = `deviceGroups-${Date.now()}.csv`, subkey, headers = true) {
    super.writeToCSV(filename, subkey, headers);
  }
}
