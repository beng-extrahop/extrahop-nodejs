// DeviceGroup.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const DeviceGroup = require('../models/deviceGroup/DeviceGroup.model');
const DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');

const AlertSet = require('../models/alert/AlertSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');
const DeviceSet = require('../models/device/DeviceSet.model');
const TriggerSet = require('../models/trigger/TriggerSet.model');

module.exports = class DeviceGroupCtrl extends BaseCtrl {

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(params = {}) {
    return new DeviceGroupSet(...this.getDeviceGroups(params));
  }

  create(data) {
    return this.postDeviceGroup(new DeviceGroup(data));
  }

  update(deviceGroup, data) {
    return this.patchDeviceGroup(deviceGroup, data);
  }

  delete(deviceGroup) {
    return this.deleteDeviceGroup(deviceGroup);
  }

  getAlerts(deviceGroup) {
    return new AlertSet(...this.getDeviceGroupAlerts(deviceGroup));
  }

  assignAlert(deviceGroup, alert) {
    return this.postDeviceGroupAlert(deviceGroup, alert);
  }

  assignAlerts(deviceGroup, alerts) {
    return this.postDeviceGroupAlerts(deviceGroup, { assign: alerts.map(alert => alert.id) });
  }

  removeAlert(deviceGroup, alert) {
    return this.deleteDeviceGroupAlert(deviceGroup, alert);
  }

  removeAlerts(deviceGroup, alerts) {
    return this.postDeviceGroupAlerts(deviceGroup, { unassign: alerts.map(alert => alert.id) });
  }

  getDashboards(deviceGroup) {
    return new DashboardSet(...this.getDeviceGroupDashboards(deviceGroup));
  }

  getDevices(deviceGroup) {
    return new DeviceSet(...this.getDeviceGroupDevices(deviceGroup));
  }

  assignDevice(deviceGroup, device) {
    return this.postDeviceGroupDevice(deviceGroup, device);
  }

  assignDevices(deviceGroup, devices) {
    return this.postDeviceGroupDevices(deviceGroup, { assign: devices.map(device => device.id) });
  }

  removeDevice(deviceGroup, device) {
    return this.deleteDeviceGroupDevice(deviceGroup, device);
  }

  removeDevices(deviceGroup, devices) {
    return this.postDeviceGroupDevices(deviceGroup, { unassign: devices.map(device => device.id) });
  }

  getTriggers(deviceGroup) {
    return new TriggerSet(...this.getDeviceGroupTriggers(deviceGroup));
  }

  assignTrigger(deviceGroup, trigger) {
    return this.postDeviceGroupTrigger(deviceGroup, trigger);
  }

  assignTriggers(deviceGroup, triggers) {
    return this.postDeviceGroupTriggers(deviceGroup, { assign: triggers.map(trigger => trigger.id) });
  }

  removeTrigger(deviceGroup, trigger) {
    return this.deleteDeviceGroupTrigger(deviceGroup, trigger);
  }

  removeTriggers(deviceGroup, triggers) {
    return this.postDeviceGroupTriggers(deviceGroup, { unassign: triggers.map(trigger => trigger.id) });
  }

  // -------------------------------------
  // Update Functions
  // -------------------------------------

  enable(deviceGroup, skip = true) {
    if (deviceGroup.disabled || !skip) {
      deviceGroup.disabled = false;
      return this.patchDeviceGroup(deviceGroup, { disabled: deviceGroup.disabled });
    }
  }

  disable(deviceGroup, skip = true) {
    if (!deviceGroup.disabled || !skip) {
      deviceGroup.disabled = true;
      return this.patchDeviceGroup(deviceGroup, { disabled: deviceGroup.disabled });
    }
  }

  toggle(deviceGroup) {
    return this.patchDeviceGroup(deviceGroup, { disabled: !deviceGroup.disabled });
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getDeviceGroups(params) {
    return this.process(this.appliance.getDeviceGroups(params), 'deviceGroups');
  }

  getDeviceGroup(deviceGroup) {
    return this.process(this.appliance.getDeviceGroup(deviceGroup.id), 'deviceGroup');
  }

  postDeviceGroup(deviceGroup) {
    return this.process(this.appliance.postDeviceGroup(deviceGroup), 'deviceGroup');
  }

  patchDeviceGroup(deviceGroup, data) {
    return this.process(this.appliance.patchDeviceGroup(deviceGroup.id, data), `deviceGroup (id: ${deviceGroup.id})`);
  }

  deleteDeviceGroup(deviceGroup) {
    return this.process(this.appliance.deleteDeviceGroup(deviceGroup.id), `deviceGroup (id: ${deviceGroup.id})`);
  }

  // -------------------------------------
  // Alert Functions
  // -------------------------------------

  getDeviceGroupAlerts(deviceGroup) {
    return this.process(this.appliance.getDeviceGroupAlerts(deviceGroup.id), 'deviceGroup alerts');
  }

  postDeviceGroupAlerts(deviceGroup, { assign, unassign }) {
    return this.process(this.appliance.postDeviceGroupAlerts(deviceGroup.id, { assign, unassign }), 'deviceGroup alerts');
  }

  postDeviceGroupAlert(deviceGroup, alert) {
    return this.process(this.appliance.postDeviceGroupAlert(deviceGroup.id, alert.id), 'deviceGroup alert');
  }

  deleteDeviceGroupAlert(deviceGroup, alert) {
    return this.process(this.appliance.deleteDeviceGroupAlert(deviceGroup.id, alert.id), 'deviceGroup alert');
  }

  // -------------------------------------
  // Dashboard Functions
  // -------------------------------------

  getDeviceGroupDashboards(deviceGroup) {
    return this.process(this.appliance.getDeviceGroupDashboards(deviceGroup.id), 'deviceGroup dashboards');
  }

  // -------------------------------------
  // Device Functions
  // -------------------------------------

  getDeviceGroupDevices(deviceGroup) {
    return this.process(this.appliance.getDeviceGroupDevices(deviceGroup.id), 'deviceGroup devices');
  }

  postDeviceGroupDevices(deviceGroup, { assign, unassign }) {
    return this.process(this.appliance.postDeviceGroupDevices(deviceGroup.id, { assign, unassign }), 'deviceGroup devices');
  }

  postDeviceGroupDevice(deviceGroup, device) {
    return this.process(this.appliance.postDeviceGroupDevice(deviceGroup.id, device.id), 'deviceGroup device');
  }

  deleteDeviceGroupDevice(deviceGroup, device) {
    return this.process(this.appliance.deleteDeviceGroupDevice(deviceGroup.id, device.id), 'deviceGroup device');
  }

  // -------------------------------------
  // Trigger Functions
  // -------------------------------------

  getDeviceGroupTriggers(deviceGroup) {
    return this.process(this.appliance.getDeviceGroupTriggers(deviceGroup.id), 'deviceGroup triggers');
  }

  postDeviceGroupTriggers(deviceGroup, { assign, unassign }) {
    return this.process(this.appliance.postDeviceGroupTriggers(deviceGroup.id, { assign, unassign }), 'deviceGroup triggers');
  }

  postDeviceGroupTrigger(deviceGroup, trigger) {
    return this.process(this.appliance.postDeviceGroupTrigger(deviceGroup.id, trigger.id), 'deviceGroup trigger');
  }

  deleteDeviceGroupTrigger(deviceGroup, trigger) {
    return this.process(this.appliance.deleteDeviceGroupDevice(deviceGroup.id, trigger.id), 'deviceGroup trigger');
  }
};
