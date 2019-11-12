// DeviceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Device = require('../../models/device/Device.model');

module.exports = class DeviceSet extends BaseObjectSet {
  constructor(devices = []) {
    super(devices);
    devices.forEach(device => this.push(new Device(device)));
  }

  writeToCSV(options = {}) {
    const { filename = `devices-${this.generateId()}.csv`, subkey } = options;
    super.writeToCSV(filename, subkey);
  }
}
