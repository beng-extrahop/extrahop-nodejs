// DeviceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Device = require('../../models/device/Device.model');

module.exports = class DeviceSet extends BaseObjectSet {

  constructor(...devices) {
    super(...devices.map(device => new Device(device)));
  }

  writeToCSV(options = {}) {
    const { filename = `devices-${this.generateId()}.csv`, subkey } = options;
    super.writeToCSV(filename, subkey);
  }
}
