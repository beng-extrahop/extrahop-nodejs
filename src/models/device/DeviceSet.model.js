// DeviceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Device = require('../../models/device/Device.model');

module.exports = class DeviceSet extends BaseObjectSet {
  constructor(devices = []) {
    super(devices.map(device => new Device(device)));
  }

  with(filter = {}) {
    return this.filter(device => Object.keys(filter).every(key => device[key] == filter[key]));
  }

  without(filter = {}) {
    return this.filter(device => Object.keys(filter).every(key => device[key] != filter[key]));
  }

  withAny(filter = {}) {
    return this.filter(device => Object.keys(filter).some(key => device[key] == filter[key]));
  }

  withoutAny(filter = {}) {
    return this.filter(device => Object.keys(filter).some(key => device[key] != filter[key]));
  }

  writeToCSV({ filename = `devices-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
