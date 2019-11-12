// Alert.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Alert = require('../models/alert/Alert.model');
const AlertSet = require('../models/alert/AlertSet.model');

module.exports = class AlertCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  get(alert) {
    return alert ? new Alert(this.getAlert(alert)) : new AlertSet(this.getAlerts());
  }

  create(data) {
    return this.postAlert(this.build(data));
  }

  update(alert, data) {
    return this.patchAlert(alert, data);
  }

  delete(alert) {
    return this.deleteAlert(alert);
  }

  build(data) {
    return new Alert(data);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getAlerts() {
    return this.process(this.appliance.getAlerts(), 'alerts​');
  }

  getAlert(alert) {
    return this.process(this.appliance.getAlert(alert.id), 'alert');
  }

  postAlert(alert) {
    return this.process(this.appliance.postAlert(alert), 'alert');
  }

  deleteAlert(alert) {
    return this.process(this.appliance.deleteAlert(alert.id), 'alert');
  }

  patchAlert(alert, data) {
    return this.process(this.appliance.patchAlert(alert.id, data), 'alert');
  }

  // -------------------------------------
  // Application Functions
  // -------------------------------------

  getAlertApplications(alert) {
    return this.process(this.appliance.getAlertApplications(alert.id), 'alert applications');
  }

  postAlertApplications(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertApplications(alert.id, { assign, unassign }), 'alert applications​');
  }

  deleteAlertApplication(alert, application) {
    return this.process(this.appliance.deleteAlertApplication(alert.id, application.id), 'alert application');
  }

  postAlertApplication(alert, application) {
    return this.process(this.appliance.postAlertApplication(alert.id, application.id), 'alert application');
  }

  // -------------------------------------
  // DeviceGroup Functions
  // -------------------------------------

  getAlertDeviceGroups(alert) {
    return this.process(this.appliance.getAlertDeviceGroups(alert.id), 'alert device groups');
  }

  postAlertDeviceGroups(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertDeviceGroups(alert.id, { assign, unassign }), 'alert device groups');
  }

  deleteAlertDeviceGroup(alert, deviceGroup) {
    return this.process(this.appliance.deleteAlertDeviceGroup(alert.id, deviceGroup.id), 'alert device group');
  }

  postAlertDeviceGroup(alert, deviceGroup) {
    return this.process(this.appliance.postAlertDeviceGroup(alert.id, deviceGroup.id), 'alert device group');
  }

  // -------------------------------------
  // Device Functions
  // -------------------------------------

  getAlertDevices(alert) {
    return this.process(this.appliance.getAlertDevices(alert.id), 'alert devices');
  }

  postAlertDevices(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertDevices(alert.id, { assign, unassign }), 'alert devices');
  }

  deleteAlertDevice(alert, device) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, device.id), 'alert device');
  }

  postAlertDevice(alert, device) {
    return this.process(this.appliance.postAlertDevice(alert.id, device.id), 'alert device');
  }

  // -------------------------------------
  // EmailGroup Functions
  // -------------------------------------

  getAlertEmailGroups(alert) {
    return this.process(this.appliance.getAlertEmailGroups(alert.id), 'alert email groups');
  }

  postAlertEmailGroups(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertEmailGroups(alert.id, { assign, unassign }), 'alert email groups');
  }

  deleteAlertEmailGroup(alert, emailGroup) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, emailGroup.id), 'alert email group');
  }

  postAlertEmailGroup(alert, emailGroup) {
    return this.process(this.appliance.postAlertEmailGroup(alert.id, emailGroup.id), 'alert email group');
  }

  // -------------------------------------
  // ExclusionInterval Functions
  // -------------------------------------

  getAlertExclusionIntervals(alert) {
    return this.process(this.appliance.getAlertExclusionIntervals(alert.id), 'alert exclusion intervals');
  }

  postAlertExclusionIntervals(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertExclusionIntervals(alert.id, { assign, unassign }), 'alert exclusion intervals');
  }

  deleteAlertExclusionInterval(alert, exclusionInterval) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, exclusionInterval.id), 'alert exclusion interval');
  }

  postAlertExclusionInterval(alert, exclusionInterval) {
    return this.process(this.appliance.postAlertExclusionInterval(alert.id, exclusionInterval.id), 'alert exclusion interval');
  }

  // -------------------------------------
  // Network Functions
  // -------------------------------------

  getAlertNetworks(alert) {
    return this.process(this.appliance.getAlertNetwork(alert.id), 'alert networks');
  }

  postAlertNetworks(alert, assign = [], unassign = []) {
    return this.process(this.appliance.postAlertNetworks(alert.id, { assign, unassign }), 'alert networks');
  }

  deleteAlertNetwork(alert, network) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, network.id), 'alert network');
  }

  postAlertNetwork(alert, network) {
    return this.process(this.appliance.postAlertNetwork(alert.id, network.id), 'alert network');
  }

  // -------------------------------------
  // Stat Functions
  // -------------------------------------

  getAlertStats(alert) {
    return this.process(this.appliance.getAlertStats(alert.id), 'alert stats');
  }
}
