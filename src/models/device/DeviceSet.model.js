// DeviceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Device = require('../../models/device/Device.model');

module.exports = class DeviceSet extends BaseObjectSet {
  constructor(devices = []) {
    super();
    devices.forEach(device => this.push(new Device(device)));
  }

  writeToCSV(filename = `devices-${Date.now()}.csv`, subkey, headers = true) {
    super.writeToCSV(filename, subkey, headers);
  }
}
