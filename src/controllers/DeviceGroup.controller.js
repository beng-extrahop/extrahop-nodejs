// DeviceGroup.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const DeviceGroup = require('../models/deviceGroup/DeviceGroup.model');
const DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');

const AlertSet = require('../models/alert/AlertSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');
const DeviceSet = require('../models/device/DeviceSet.model');
const TriggerSet = require('../models/trigger/TriggerSet.model');

const OBJECT_NAME = 'device group';

module.exports = class DeviceGroupCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(params = {}) {
    return new DeviceGroupSet(this.getDeviceGroups(params));
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
    return new AlertSet(this.getDeviceGroupAlerts(deviceGroup));
  }

  assignAlert(deviceGroup, alert) {
    return this.postDeviceGroupAlert(deviceGroup, alert);
  }

  assignAlerts(deviceGroup, alerts) {
    return this.postDeviceGroupAlerts(deviceGroup, { assign: alerts.map((alert) => alert.id || alert) });
  }

  removeAlert(deviceGroup, alert) {
    return this.deleteDeviceGroupAlert(deviceGroup, alert);
  }

  removeAlerts(deviceGroup, alerts) {
    return this.postDeviceGroupAlerts(deviceGroup, { unassign: alerts.map((alert) => alert.id || alert) });
  }

  getDashboards(deviceGroup) {
    return new DashboardSet(this.getDeviceGroupDashboards(deviceGroup));
  }

  getDevices(deviceGroup) {
    return new DeviceSet(this.getDeviceGroupDevices(deviceGroup));
  }

  assignDevice(deviceGroup, device) {
    return this.postDeviceGroupDevice(deviceGroup, device);
  }

  assignDevices(deviceGroup, devices) {
    return this.postDeviceGroupDevices(deviceGroup, { assign: devices.map((device) => device.id || device) });
  }

  removeDevice(deviceGroup, device) {
    return this.deleteDeviceGroupDevice(deviceGroup, device);
  }

  removeDevices(deviceGroup, devices) {
    return this.postDeviceGroupDevices(deviceGroup, { unassign: devices.map((device) => device.id || device) });
  }

  getTriggers(deviceGroup) {
    return new TriggerSet(this.getDeviceGroupTriggers(deviceGroup));
  }

  assignTrigger(deviceGroup, trigger) {
    return this.postDeviceGroupTrigger(deviceGroup, trigger);
  }

  assignTriggers(deviceGroup, triggers) {
    return this.postDeviceGroupTriggers(deviceGroup, { assign: triggers.map((trigger) => trigger.id || trigger) });
  }

  removeTrigger(deviceGroup, trigger) {
    return this.deleteDeviceGroupTrigger(deviceGroup, trigger);
  }

  removeTriggers(deviceGroup, triggers) {
    return this.postDeviceGroupTriggers(deviceGroup, { unassign: triggers.map((trigger) => trigger.id || trigger) });
  }

  // -------------------------------------
  // Updates
  // -------------------------------------

  enable(deviceGroup, skip = true) {
    if (!deviceGroup.disabled && skip) {
      return null;
    }

    return this.patchDeviceGroup(deviceGroup, { disabled: false });
  }

  disable(deviceGroup, skip = true) {
    if (deviceGroup.disabled && skip) {
      return null;
    }

    return this.patchDeviceGroup(deviceGroup, { disabled: true });
  }

  toggle(deviceGroup) {
    return this.patchDeviceGroup(deviceGroup, { disabled: !deviceGroup.disabled });
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getDeviceGroups(params) {
    return this.process(this.appliance.getDeviceGroups(params), OBJECT_NAME);
  }

  getDeviceGroup(deviceGroup) {
    return this.process(this.appliance.getDeviceGroup(deviceGroup.id), OBJECT_NAME);
  }

  postDeviceGroup(deviceGroup) {
    return this.process(this.appliance.postDeviceGroup(deviceGroup), OBJECT_NAME);
  }

  patchDeviceGroup(deviceGroup, data) {
    return this.process(this.appliance.patchDeviceGroup(deviceGroup.id, data), OBJECT_NAME);
  }

  deleteDeviceGroup(deviceGroup) {
    return this.process(this.appliance.deleteDeviceGroup(deviceGroup.id), OBJECT_NAME);
  }

  // -------------------------------------
  // Alerts
  // -------------------------------------

  getDeviceGroupAlerts(deviceGroup) {
    return this.process(this.appliance.getDeviceGroupAlerts(deviceGroup.id), `${OBJECT_NAME} alert`);
  }

  postDeviceGroupAlerts(deviceGroup, { assign, unassign }) {
    return this.process(this.appliance.postDeviceGroupAlerts(deviceGroup.id, { assign, unassign }), `${OBJECT_NAME} alert`);
  }

  postDeviceGroupAlert(deviceGroup, alert) {
    return this.process(this.appliance.postDeviceGroupAlert(deviceGroup.id, alert.id), `${OBJECT_NAME} alert`);
  }

  deleteDeviceGroupAlert(deviceGroup, alert) {
    return this.process(this.appliance.deleteDeviceGroupAlert(deviceGroup.id, alert.id), `${OBJECT_NAME} alert`);
  }

  // -------------------------------------
  // Dashboards
  // -------------------------------------

  getDeviceGroupDashboards(deviceGroup) {
    return this.process(this.appliance.getDeviceGroupDashboards(deviceGroup.id), `${OBJECT_NAME} dashboard`);
  }

  // -------------------------------------
  // Devices
  // -------------------------------------

  getDeviceGroupDevices(deviceGroup, params) {
    return this.process(this.appliance.getDeviceGroupDevices(deviceGroup.id, params), `${OBJECT_NAME} device`);
  }

  postDeviceGroupDevices(deviceGroup, { assign, unassign }) {
    return this.process(this.appliance.postDeviceGroupDevices(deviceGroup.id, { assign, unassign }), `${OBJECT_NAME} device`);
  }

  postDeviceGroupDevice(deviceGroup, device) {
    return this.process(this.appliance.postDeviceGroupDevice(deviceGroup.id, device.id), `${OBJECT_NAME} device`);
  }

  deleteDeviceGroupDevice(deviceGroup, device) {
    return this.process(this.appliance.deleteDeviceGroupDevice(deviceGroup.id, device.id), `${OBJECT_NAME} device`);
  }

  // -------------------------------------
  // Triggers
  // -------------------------------------

  getDeviceGroupTriggers(deviceGroup) {
    return this.process(this.appliance.getDeviceGroupTriggers(deviceGroup.id), `${OBJECT_NAME} trigger`);
  }

  postDeviceGroupTriggers(deviceGroup, { assign, unassign }) {
    return this.process(this.appliance.postDeviceGroupTriggers(deviceGroup.id, { assign, unassign }), `${OBJECT_NAME} trigger`);
  }

  postDeviceGroupTrigger(deviceGroup, trigger) {
    return this.process(this.appliance.postDeviceGroupTrigger(deviceGroup.id, trigger.id), `${OBJECT_NAME} trigger`);
  }

  deleteDeviceGroupTrigger(deviceGroup, trigger) {
    return this.process(this.appliance.deleteDeviceGroupDevice(deviceGroup.id, trigger.id), `${OBJECT_NAME} trigger`);
  }
};
