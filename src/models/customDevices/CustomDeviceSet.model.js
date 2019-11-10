// CustomDeviceSet.model.js

const BaseObjectSet = require('../../models/base/BaseObjectSet.model');
const CustomDevice = require('../../models/customDevices/CustomDevice.model');

module.exports = class CustomDeviceSet extends BaseObjectSet {
  constructor(customDevices = []) {
    super();
    customDevices.forEach(customDevice => this.push(new CustomDevice(customDevice)));
  }
}
