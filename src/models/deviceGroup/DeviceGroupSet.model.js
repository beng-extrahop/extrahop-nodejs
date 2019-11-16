// DeviceGroupSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const DeviceGroup = require('../../models/deviceGroup/DeviceGroup.model');

module.exports = class DeviceGroupSet extends BaseObjectSet {

  constructor(...deviceGroups) {
    super(...deviceGroups.map(deviceGroup => new DeviceGroup(deviceGroup)));
  }

  writeToCSV({ filename = `deviceGroups-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }

}
