// CustomDeviceSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const CustomDevice = require('./CustomDevice.model');

module.exports = class CustomDeviceSet extends BaseObjectSet {
  constructor(customDevices = []) {
    super(Array.from(customDevices).map((customDevice) => new CustomDevice(customDevice)));
  }
};
