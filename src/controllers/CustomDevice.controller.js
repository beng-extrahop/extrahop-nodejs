// CustomDevice.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const CustomDevice = require('../models/customDevice/CustomDevice.model');
const CustomDeviceSet = require('../models/customDevice/CustomDeviceSet.model');
const CustomDeviceCriteria = require('../models/customDevice/CustomDeviceCriteria.model');
const CustomDeviceCriteriaSet = require('../models/customDevice/CustomDeviceCriteriaSet.model');

const OBJECT_NAME = 'custom device';

module.exports = class CustomDeviceCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(customDevice, params) {
    return customDevice
      ? new CustomDevice(this.getCustomDevice(customDevice, params))
      : new CustomDeviceSet(this.getCustomDevices(params));
  }

  getCriteria(customDevice, criteria) {
    return criteria
      ? new CustomDeviceCriteria(this.getCustomDeviceCriteria(customDevice, criteria))
      : new CustomDeviceCriteriaSet(this.getCustomDeviceCriterias(customDevice));
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
  // Defaults
  // -------------------------------------

  getCustomDevices(params = { include_criteria: true }) {
    return this.process(this.appliance.getCustomDevices(params), OBJECT_NAME);
  }

  getCustomDevice(customDevice, params = { include_criteria: true }) {
    return this.process(this.appliance.getCustomDevice(customDevice.id, params), OBJECT_NAME);
  }

  postCustomDevice(customDevice) {
    return this.process(this.appliance.postCustomDevice(customDevice), OBJECT_NAME);
  }

  deleteCustomDevice(id) {
    return this.process(this.appliance.deleteCustomDevice(id), OBJECT_NAME);
  }

  patchCustomDevice(customDevice, data) {
    return this.process(this.appliance.patchCustomDevice(customDevice.id, data), OBJECT_NAME);
  }

  // -------------------------------------
  // Criteria
  // -------------------------------------

  getCustomDeviceCriterias(customDevice) {
    return this.process(this.appliance.getCustomDeviceCriterias(customDevice.id), `${OBJECT_NAME} criteria`);
  }

  postCustomDeviceCriteria(customDevice, criteria) {
    return this.process(this.appliance.postCustomDeviceCriteria(customDevice.id, criteria), `${OBJECT_NAME} criteria`);
  }

  deleteCustomDeviceCriteria(customDevice, criteria) {
    return this.process(this.appliance.deleteCustomDeviceCriteria(customDevice.id, criteria), `${OBJECT_NAME} criteria`);
  }

  getCustomDeviceCriteria(customDevice, criteria) {
    return this.process(this.appliance.getCustomDeviceCriteria(customDevice.id, criteria.id), `${OBJECT_NAME} criteria`);
  }
};
