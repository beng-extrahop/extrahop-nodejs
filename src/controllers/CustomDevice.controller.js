// CustomDevice.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const CustomDevice = require('../models/customDevice/CustomDevice.model');
const CustomDeviceSet = require('../models/customDevice/CustomDeviceSet.model');

module.exports = class CustomDeviceCtrl extends BaseCtrl {

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(customDevice) {
    return customDevice
      ? new CustomDevice(this.getCustomDevice(customDevice))
      : new CustomDeviceSet(...this.getCustomDevices());
  }

  getCriteria(customDevice) {
    return this.getCustomDeviceCriteria(customDevice);
  }

  create(data) {
    return this.postCustomDevice(new CustomDevice(data));
  }

  update(customDevice, data) {
    return this.patchCustomDevice(customDevice, data);
  }

  delete(customDevice) {
    return this.deleteCustomDevice(customDevice);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getCustomDevices(params) {
    return this.process(this.appliance.getCustomDevices(params), 'custom devices');
  }

  getCustomDevice(customDevice, criteria) {
    return this.process(this.appliance.getCustomDevice(customDevice.id, criteria), 'custom device');
  }

  postCustomDevice(customDevice) {
    return this.process(this.appliance.postCustomDevice(customDevice), 'custom device');
  }

  deleteCustomDevice(id) {
    return this.process(this.appliance.deleteCustomDevice(id), 'custom device');
  }

  patchCustomDevice(customDevice, data) {
    return this.process(this.appliance.patchCustomDevice(customDevice.id, data), 'custom device');
  }

  // -------------------------------------
  // Criteria Functions
  // -------------------------------------

  getCustomDeviceCriteria(customDevice) {
    return this.process(this.appliance.getCustomDeviceCriteria(customDevice.id), 'custom device criteria');
  }

  postCustomDeviceCriteria(customDevice, criteria) {
    return this.process(this.appliance.postCustomDeviceCriteria(customDevice.id, criteria), 'custom device criteria');
  }

  deleteCustomDeviceCriteria(customDevice, criteria) {
    return this.process(this.appliance.deleteCustomDeviceCriteria(customDevice.id, criteria), 'custom device criteria');
  }
};
