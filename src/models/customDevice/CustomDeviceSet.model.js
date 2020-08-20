// CustomDeviceSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const CustomDevice = require('./CustomDevice.model');

module.exports = class CustomDeviceSet extends BaseObjectSet {
  constructor(customDevices = []) {
    super();
    customDevices.forEach((customDevice) => this.push(new CustomDevice(customDevice)));
  }

  writeToCSV({ filename = `customDevices-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
