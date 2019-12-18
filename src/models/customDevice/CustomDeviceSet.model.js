// CustomDeviceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const CustomDevice = require('../../models/customDevice/CustomDevice.model');

module.exports = class CustomDeviceSet extends BaseObjectSet {
  constructor(customDevices = []) {
    super();
    customDevices.forEach(customDevice => this.push(new CustomDevice(customDevice)));
  }

  writeToCSV({ filename = `customDevices-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
