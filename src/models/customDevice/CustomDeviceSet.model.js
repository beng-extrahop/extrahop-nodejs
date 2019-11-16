// CustomDeviceSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const CustomDevice = require('../../models/customDevice/CustomDevice.model');

module.exports = class CustomDeviceSet extends BaseObjectSet {

  constructor(...customDevices) {
    super(...customDevices.map(customDevice => new CustomDevice(customDevice)));
  }

  writeToCSV({ filename = `customDevices-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }

}
