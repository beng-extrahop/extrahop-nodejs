// DeviceSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Device = require('./Device.model');

module.exports = class DeviceSet extends BaseObjectSet {
  constructor(devices = []) {
    super(Array.from(devices).map((device) => new Device(device)));
  }

  with(filter = {}) {
    return this.filter((device) => Object.keys(filter).every((key) => device[key] == filter[key]));
  }

  without(filter = {}) {
    return this.filter((device) => Object.keys(filter).every((key) => device[key] != filter[key]));
  }

  withAny(filter = {}) {
    return this.filter((device) => Object.keys(filter).some((key) => device[key] == filter[key]));
  }

  withoutAny(filter = {}) {
    return this.filter((device) => Object.keys(filter).some((key) => device[key] != filter[key]));
  }
};
