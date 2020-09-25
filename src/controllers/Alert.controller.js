// Alert.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Alert = require('../models/alert/Alert.model');
const AlertSet = require('../models/alert/AlertSet.model');
const AlertStatSet = require('../models/alert/AlertStatSet.model');
const ApplicationSet = require('../models/application/ApplicationSet.model');
const DeviceSet = require('../models/device/DeviceSet.model');
const DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');
const EmailGroupSet = require('../models/emailGroup/EmailGroupSet.model');
const ExclusionIntervalSet = require('../models/exclusionInterval/ExclusionIntervalSet.model');
const NetworkSet = require('../models/network/NetworkSet.model');

const OBJECT_NAME = 'alert';

module.exports = class AlertCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(alert) {
    return alert ? new Alert(this.getAlert(alert)) : new AlertSet(this.getAlerts());
  }

  post(data) {
    return this.postAlert(new Alert(data));
  }

  create(data) {
    return this.post(data);
  }

  update(alert, data) {
    return this.patchAlert(alert, data);
  }

  delete(alert) {
    return this.deleteAlert(alert);
  }

  getApplications(alert) {
    return new ApplicationSet(this.getAlertApplications(alert));
  }

  getDevices(alert) {
    return new DeviceSet(this.getAlertDevices(alert));
  }

  getDeviceGroups(alert) {
    return new DeviceGroupSet(this.getAlertDeviceGroups(alert));
  }

  getEmailGroups(alert) {
    return new EmailGroupSet(this.getAlertEmailGroups(alert));
  }

  getExclusionIntervals(alert) {
    return new ExclusionIntervalSet(this.getAlertExclusionIntervals(alert));
  }

  getNetworks(alert) {
    return new NetworkSet(this.getAlertNetworks(alert));
  }

  getStats(alert) {
    return new AlertStatSet(this.getAlertStats(alert));
  }

  assignApplications(alert, applications) {
    return Array.from(applications).length
      ? this.postAlertApplication(alert, applications)
      : this.postAlertApplications(alert, { assign: applications });
  }

  assignDevices(alert, devices) {
    return Array.from(devices).length
      ? this.postAlertDevice(alert, devices)
      : this.postAlertDevices(alert, { assign: devices });
  }

  assignDeviceGroups(alert, deviceGroups) {
    return Array.from(deviceGroups).length
      ? this.postAlertDeviceGroup(alert, deviceGroups)
      : this.postAlertDeviceGroups(alert, { assign: deviceGroups });
  }

  assignEmailGroups(alert, emailGroups) {
    return Array.from(emailGroups).length
      ? this.postAlertEmailGroup(alert, emailGroups)
      : this.postAlertEmailGroups(alert, { assign: emailGroups });
  }

  assignExclusionIntervals(alert, exclusionIntervals) {
    return Array.from(exclusionIntervals).length
      ? this.postAlertExclusionInterval(alert, exclusionIntervals)
      : this.postAlertExclusionIntervals(alert, { assign: exclusionIntervals });
  }

  assignNetworks(alert, networks) {
    return Array.from(networks).length
      ? this.postAlertNetwork(alert, networks)
      : this.postAlertNetworks(alert, { assign: networks });
  }

  unassignApplications(alert, applications) {
    return Array.from(applications).length
      ? this.deleteAlertApplication(alert, applications)
      : this.postAlertApplications(alert, { unassign: applications });
  }

  unassignDevices(alert, devices) {
    return Array.from(devices).length
      ? this.deleteAlertDevice(alert, devices)
      : this.postAlertDevices(alert, { unassign: devices });
  }

  unassignDeviceGroups(alert, deviceGroups) {
    return Array.from(deviceGroups).length
      ? this.deleteAlertDeviceGroup(alert, deviceGroups)
      : this.postAlertDeviceGroups(alert, { unassign: deviceGroups });
  }

  unassignEmailGroups(alert, emailGroups) {
    return Array.from(emailGroups).length
      ? this.deleteAlertEmailGroup(alert, emailGroups)
      : this.postAlertEmailGroups(alert, { unassign: emailGroups });
  }

  unassignExclusionIntervals(alert, exclusionIntervals) {
    return Array.from(exclusionIntervals).length
      ? this.deleteAlertExclusionInterval(alert, exclusionIntervals)
      : this.postAlertExclusionIntervals(alert, { unassign: exclusionIntervals });
  }

  unassignNetworks(alert, networks) {
    return Array.from(networks).length
      ? this.deleteAlertNetwork(alert, networks)
      : this.postAlertNetworks(alert, { unassign: networks });
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getAlerts() {
    return this.process(this.appliance.getAlerts(), OBJECT_NAME);
  }

  getAlert(alert) {
    return this.process(this.appliance.getAlert(alert.id), OBJECT_NAME);
  }

  postAlert(alert) {
    return this.process(this.appliance.postAlert(alert), OBJECT_NAME);
  }

  deleteAlert(alert) {
    return this.process(this.appliance.deleteAlert(alert.id), OBJECT_NAME);
  }

  patchAlert(alert, data) {
    return this.process(this.appliance.patchAlert(alert.id, data), OBJECT_NAME);
  }

  // -------------------------------------
  // Applications
  // -------------------------------------

  getAlertApplications(alert) {
    return this.process(this.appliance.getAlertApplications(alert.id), `${OBJECT_NAME} applications`);
  }

  postAlertApplications(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertApplications(alert.id, { assign, unassign }), `${OBJECT_NAME} applications​`);
  }

  postAlertApplication(alert, application) {
    return this.process(this.appliance.postAlertApplication(alert.id, application.id), `${OBJECT_NAME} application`);
  }

  deleteAlertApplication(alert, application) {
    return this.process(this.appliance.deleteAlertApplication(alert.id, application.id), `${OBJECT_NAME} application`);
  }

  // -------------------------------------
  // Devices
  // -------------------------------------

  getAlertDevices(alert) {
    return this.process(this.appliance.getAlertDevices(alert.id), `${OBJECT_NAME} devices`);
  }

  postAlertDevices(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertDevices(alert.id, { assign, unassign }), `${OBJECT_NAME} devices`);
  }

  postAlertDevice(alert, device) {
    return this.process(this.appliance.postAlertDevice(alert.id, device.id), `${OBJECT_NAME} device`);
  }

  deleteAlertDevice(alert, device) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, device.id), `${OBJECT_NAME} device`);
  }

  // -------------------------------------
  // DeviceGroups
  // -------------------------------------

  getAlertDeviceGroups(alert) {
    return this.process(this.appliance.getAlertDeviceGroups(alert.id), `${OBJECT_NAME} device groups`);
  }

  postAlertDeviceGroups(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertDeviceGroups(alert.id, { assign, unassign }), `${OBJECT_NAME} device groups`);
  }

  postAlertDeviceGroup(alert, deviceGroup) {
    return this.process(this.appliance.postAlertDeviceGroup(alert.id, deviceGroup.id), `${OBJECT_NAME} device group`);
  }

  deleteAlertDeviceGroup(alert, deviceGroup) {
    return this.process(this.appliance.deleteAlertDeviceGroup(alert.id, deviceGroup.id), `${OBJECT_NAME} device group`);
  }

  // -------------------------------------
  // EmailGroups
  // -------------------------------------

  getAlertEmailGroups(alert) {
    return this.process(this.appliance.getAlertEmailGroups(alert.id), `${OBJECT_NAME} email groups`);
  }

  postAlertEmailGroups(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertEmailGroups(alert.id, { assign, unassign }), `${OBJECT_NAME} email groups`);
  }

  postAlertEmailGroup(alert, emailGroup) {
    return this.process(this.appliance.postAlertEmailGroup(alert.id, emailGroup.id), `${OBJECT_NAME} email group`);
  }

  deleteAlertEmailGroup(alert, emailGroup) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, emailGroup.id), `${OBJECT_NAME} email group`);
  }

  // -------------------------------------
  // ExclusionIntervals
  // -------------------------------------

  getAlertExclusionIntervals(alert) {
    return this.process(this.appliance.getAlertExclusionIntervals(alert.id), `${OBJECT_NAME} exclusion intervals`);
  }

  postAlertExclusionIntervals(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertExclusionIntervals(alert.id, { assign, unassign }), `${OBJECT_NAME} exclusion intervals`);
  }

  postAlertExclusionInterval(alert, exclusionInterval) {
    return this.process(this.appliance.postAlertExclusionInterval(alert.id, exclusionInterval.id), `${OBJECT_NAME} exclusion interval`);
  }

  deleteAlertExclusionInterval(alert, exclusionInterval) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, exclusionInterval.id), `${OBJECT_NAME} exclusion interval`);
  }

  // -------------------------------------
  // Networks
  // -------------------------------------

  getAlertNetworks(alert) {
    return this.process(this.appliance.getAlertNetwork(alert.id), `${OBJECT_NAME} networks`);
  }

  postAlertNetworks(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertNetworks(alert.id, { assign, unassign }), `${OBJECT_NAME} networks`);
  }

  postAlertNetwork(alert, network) {
    return this.process(this.appliance.postAlertNetwork(alert.id, network.id), `${OBJECT_NAME} network`);
  }

  deleteAlertNetwork(alert, network) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, network.id), `${OBJECT_NAME} network`);
  }

  // -------------------------------------
  // Stats
  // -------------------------------------

  getAlertStats(alert) {
    return this.process(this.appliance.getAlertStats(alert.id), `${OBJECT_NAME} stats`);
  }
};
