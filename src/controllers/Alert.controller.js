// Alert.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Alert = require('../models/alert/Alert.model');
const AlertSet = require('../models/alert/AlertSet.model');
const AlertStatSet = require('../models/alert/AlertStatSet.model');
const ApplicationSet = require('../models/application/ApplicationSet.model');
const DeviceSet = require('../models/device/DeviceSet.model');
const DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');
const EmailGroupSet = require('../models/emailGroup/EmailGroupSet.model');
const ExclusionIntervalSet = require('../models/exclusionInterval/ExclusionIntervalSet.model');
const NetworkSet = require('../models/network/NetworkSet.model');

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
    if ( !applications )
      return this.printError('assign', 'applications', 'Array[...applications] or { application } is required');

    return applications instanceof Array
      ? this.postAlertApplications(alert, { assign: applications })
      : this.postAlertApplication(alert, applications);
  }

  assignDevices(alert, devices) {
    if ( !devices )
      return this.printError('assign', 'devices', 'Array[...devices] or { device } is required');

    return devices instanceof Array
      ? this.postAlertDevices(alert, { assign: devices })
      : this.postAlertDevice(alert, devices);
  }

  assignDeviceGroups(alert, deviceGroups) {
    if ( !deviceGroups )
      return this.printError('assign', 'deviceGroups', 'Array[...deviceGroups] or { deviceGroup } is required');

    return deviceGroups instanceof Array
      ? this.postAlertDeviceGroups(alert, { assign: deviceGroups })
      : this.postAlertDeviceGroup(alert, deviceGroups);
  }

  assignEmailGroups(alert, emailGroups) {
    if ( !emailGroups )
      return this.printError('assign', 'emailGroups', 'Array[...emailGroups] or { emailGroup } is required');

    return emailGroups instanceof Array
      ? this.postAlertEmailGroups(alert, { assign: emailGroups })
      : this.postAlertEmailGroup(alert, emailGroups);
  }

  assignExclusionIntervals(alert, exclusionIntervals) {
    if ( !exclusionIntervals )
      return this.printError('assign', 'exclusionIntervals', 'Array[...exclusionIntervals] or { exclusionInterval } is required');

    return exclusionIntervals instanceof Array
      ? this.postAlertExclusionIntervals(alert, { assign: exclusionIntervals })
      : this.postAlertExclusionInterval(alert, exclusionIntervals);
  }

  assignNetworks(alert, networks) {
    if ( !networks )
      return this.printError('assign', 'networks', 'Array[...networks] or { network } is required');

    return networks instanceof Array
      ? this.postAlertNetworks(alert, { assign: networks })
      : this.postAlertNetwork(alert, networks);
  }


  unassignApplications(alert, applications) {
    if ( !applications )
      return this.printError('unassign', 'applications', 'Array[...applications] or { application } is required');

    return applications instanceof Array
      ? this.postAlertApplications(alert, { unassign: applications })
      : this.deleteAlertApplication(alert, applications);
  }

  unassignDevices(alert, devices) {
    if ( !devices )
      return this.printError('unassign', 'devices', 'Array[...devices] or { device } is required');

    return devices instanceof Array
      ? this.postAlertDevices(alert, { unassign: devices })
      : this.deleteAlertDevice(alert, devices);
  }

  unassignDeviceGroups(alert, deviceGroups) {
    if ( !deviceGroups )
      return this.printError('unassign', 'deviceGroups', 'Array[...deviceGroups] or { deviceGroup } is required');

    return deviceGroups instanceof Array
      ? this.postAlertDeviceGroups(alert, { unassign: deviceGroups })
      : this.deleteAlertDeviceGroup(alert, deviceGroups);
  }

  unassignEmailGroups(alert, emailGroups) {
    if ( !emailGroups )
      return this.printError('unassign', 'emailGroups', 'Array[...emailGroups] or { emailGroup } is required');

    return emailGroups instanceof Array
      ? this.postAlertEmailGroups(alert, { unassign: emailGroups })
      : this.deleteAlertEmailGroup(alert, emailGroups);
  }

  unassignExclusionIntervals(alert, exclusionIntervals) {
    if ( !exclusionIntervals )
      return this.printError('unassign', 'exclusionIntervals', 'Array[...exclusionIntervals] or { exclusionInterval } is required');

    return exclusionIntervals instanceof Array
      ? this.postAlertExclusionIntervals(alert, { unassign: exclusionIntervals })
      : this.deleteAlertExclusionInterval(alert, exclusionIntervals);
  }

  unassignNetworks(alert, networks) {
    if ( !networks )
      return this.printError('unassign', 'networks', 'Array[...networks] or { network } is required');

    return networks instanceof Array
      ? this.postAlertNetworks(alert, { unassign: networks })
      : this.deleteAlertNetwork(alert, networks);
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

  postAlertApplication(alert, application) {
    return this.process(this.appliance.postAlertApplication(alert.id, application.id), 'alert application');
  }

  deleteAlertApplication(alert, application) {
    return this.process(this.appliance.deleteAlertApplication(alert.id, application.id), 'alert application');
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

  postAlertDevice(alert, device) {
    return this.process(this.appliance.postAlertDevice(alert.id, device.id), 'alert device');
  }

  deleteAlertDevice(alert, device) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, device.id), 'alert device');
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

  postAlertDeviceGroup(alert, deviceGroup) {
    return this.process(this.appliance.postAlertDeviceGroup(alert.id, deviceGroup.id), 'alert device group');
  }

  deleteAlertDeviceGroup(alert, deviceGroup) {
    return this.process(this.appliance.deleteAlertDeviceGroup(alert.id, deviceGroup.id), 'alert device group');
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

  postAlertEmailGroup(alert, emailGroup) {
    return this.process(this.appliance.postAlertEmailGroup(alert.id, emailGroup.id), 'alert email group');
  }

  deleteAlertEmailGroup(alert, emailGroup) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, emailGroup.id), 'alert email group');
  }

  // -------------------------------------
  // ExclusionInterval Functions
  // -------------------------------------

  getAlertExclusionIntervals(alert) {
    return this.process(this.appliance.getAlertExclusionIntervals(alert.id), 'alert exclusion intervals');
  }

  postAlertExclusionIntervals(alert, assign = [], unassign = []) {
    return this.process(
      this.appliance.postAlertExclusionIntervals(alert.id, { assign, unassign }),
      'alert exclusion intervals'
    );
  }

  postAlertExclusionInterval(alert, exclusionInterval) {
    return this.process(this.appliance.postAlertExclusionInterval(alert.id, exclusionInterval.id), 'alert exclusion interval');
  }

  deleteAlertExclusionInterval(alert, exclusionInterval) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, exclusionInterval.id), 'alert exclusion interval');
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

  postAlertNetwork(alert, network) {
    return this.process(this.appliance.postAlertNetwork(alert.id, network.id), 'alert network');
  }

  deleteAlertNetwork(alert, network) {
    return this.process(this.appliance.deleteAlertApplications(alert.id, network.id), 'alert network');
  }

  // -------------------------------------
  // Stat Functions
  // -------------------------------------

  getAlertStats(alert) {
    return this.process(this.appliance.getAlertStats(alert.id), 'alert stats');
  }
};
