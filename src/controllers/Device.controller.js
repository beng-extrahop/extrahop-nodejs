// Device.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const DeviceSet = require('../models/device/DeviceSet.model');
const DeviceSearch = require('../models/device/DeviceSearch.model');

const AlertSet = require('../models/alert/AlertSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');
const DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');
const DeviceActivitySet = require('../models/device/DeviceActivitySet.model');
const SoftwareSet = require('../models/software/SoftwareSet.model');
const TagSet = require('../models/tag/TagSet.model');
const TriggerSet = require('../models/trigger/TriggerSet.model');

const { Search } = require('../constants/Global.constants');

module.exports = class DeviceCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(params = {}) {
    return new DeviceSet(this.getDevices(params));
  }

  search(options = {}) {
    return new DeviceSet(this.searchDevices(new DeviceSearch(options)));
  }

  update(device, data) {
    return this.patchDevice(device, data);
  }

  getActivity(device) {
    return new DeviceActivitySet(this.getDeviceActivity(device));
  }

  getAlerts(device) {
    return new AlertSet(this.getDeviceAlerts(device));
  }

  assignAlert(device, alert) {
    return this.postDeviceAlert(device, alert);
  }

  assignAlerts(device, alerts) {
    return this.postDeviceAlerts(device, { assign: alerts.map((alert) => alert.id) });
  }

  removeAlert(device, alert) {
    return this.deleteDeviceAlert(device, alert);
  }

  removeAlerts(device, alerts) {
    return this.postDeviceAlerts(device, { unassign: alerts.map((alert) => alert.id) });
  }

  getDashboards(device) {
    return new DashboardSet(this.getDeviceDashboards(device));
  }

  getDeviceGroups(device) {
    return new DeviceGroupSet(this.getDeviceDeviceGroups(device));
  }

  assignDeviceGroup(device, deviceGroup) {
    return this.postDeviceDeviceGroup(device, deviceGroup);
  }

  assignDeviceGroups(device, deviceGroups) {
    return this.postDeviceDeviceGroups(device, { assign: deviceGroups.map((deviceGroup) => deviceGroup.id) });
  }

  removeDeviceGroup(device, deviceGroup) {
    return this.deleteDeviceDeviceGroup(device, deviceGroup);
  }

  removeDeviceGroups(device, deviceGroups) {
    return this.postDeviceDeviceGroups(device, { unassign: deviceGroups.map((deviceGroup) => deviceGroup.id) });
  }

  getSoftware(device) {
    return new SoftwareSet(this.getDeviceSoftware(device));
  }

  getTags(device) {
    return new TagSet(this.getDeviceTags(device));
  }

  getTriggers(device) {
    return new TriggerSet(this.getDeviceTriggers(device));
  }

  assignTrigger(device, trigger) {
    return this.postDeviceTrigger(device, trigger);
  }

  assignTriggers(device, triggers) {
    return this.postDeviceTriggers(device, { assign: triggers.map((trigger) => trigger.id) });
  }

  removeTrigger(device, trigger) {
    return this.deleteDeviceTrigger(device, trigger);
  }

  removeTriggers(device, triggers) {
    return this.postDeviceTriggers(device, { unassign: triggers.map((trigger) => trigger.id) });
  }

  // -------------------------------------
  // Helper Functions - GET
  // -------------------------------------

  getAll() {
    return this.get({ search_type: 'any', limit: -1 });
  }

  getByName(name) {
    return this.get({ search_type: 'name', value: name });
  }

  getByDiscoveryId(discoveryId) {
    return this.get({ search_type: Search.Types.DiscoveryId, value: discoveryId });
  }

  getByIpAddress(ip) {
    return this.get({ search_type: Search.Types.IpAddress, value: ip });
  }

  getByMacAddress(mac) {
    return this.get({ search_type: Search.Types.MacAddress, value: mac });
  }

  getByVendor(vendor) {
    return this.get({ search_type: Search.Types.Vendor, value: vendor });
  }

  getByType(type) {
    return this.get({ search_type: Search.Types.Type, value: type });
  }

  getByTag(tag) {
    return this.get({ search_type: Search.Types.Tag, value: tag });
  }

  getByActivity(activity) {
    return this.get({ search_type: Search.Types.Activity, value: activity });
  }

  getByNode(node) {
    return this.get({ search_type: Search.Types.Node, value: node });
  }

  getByVlan(vlan) {
    return this.get({ search_type: Search.Types.Vlan, value: vlan });
  }

  getByDiscoverTime(discoverTime) {
    return this.get({ search_type: Search.Types.DiscoverTime, value: discoverTime });
  }

  // -------------------------------------
  // Find Functions - Custom
  // -------------------------------------

  getById(id) {
    return this.getAll().with({ id });
  }

  getByExtrahopId(extrahopId) {
    return this.getAll().with({ extrahop_id: extrahopId });
  }

  getByParentId(parentId) {
    return this.getAll().with({ parent_id: parentId });
  }

  getCustom() {
    return this.getAll().with({ custom_type: 'custom' });
  }

  // -------------------------------------
  // Update Functions
  // -------------------------------------

  setDescription(device, description) {
    return this.update(device, { description });
  }

  setCustomName(device, customName) {
    return this.update(device, { custom_name: customName });
  }

  setCustomType(device, customType) {
    return this.update(device, { custom_type: customType });
  }

  setRole(device, role) {
    return this.update(device, { custom_type: role });
  }

  setVendor(device, vendor) {
    return this.update(device, { vendor });
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getDevices(params) {
    return this.process(this.appliance.getDevices(params), 'devices');
  }

  getDevice(device) {
    return this.process(this.appliance.getDevice(device.id), 'device');
  }

  searchDevices(search) {
    return this.process(this.appliance.postDeviceSearch(search), 'devices');
  }

  patchDevice(device, data) {
    return this.process(this.appliance.patchDevice(device.id, data), `device (id: ${device.id})`);
  }

  // -------------------------------------
  // Activity Functions
  // -------------------------------------

  getDeviceActivity(device) {
    return this.process(this.appliance.getDeviceActivity(device.id), 'device activities');
  }

  // -------------------------------------
  // Alert Functions
  // -------------------------------------

  getDeviceAlerts(device) {
    return this.process(this.appliance.getDeviceAlerts(device.id), 'device alerts');
  }

  postDeviceAlerts(device, { assign, unassign }) {
    return this.process(this.appliance.postDeviceAlerts(device.id, { assign, unassign }), 'device alerts');
  }

  postDeviceAlert(device, alert) {
    return this.process(this.appliance.postDeviceAlert(device.id, alert.id), 'device alert');
  }

  deleteDeviceAlert(device, alert) {
    return this.process(this.appliance.deleteDeviceAlert(device.id, alert.id), 'device alert');
  }

  // -------------------------------------
  // Dashboard Functions
  // -------------------------------------

  getDeviceDashboards(device) {
    return this.process(this.appliance.getDeviceDashboards(device.id), 'device dashboards');
  }

  // -------------------------------------
  // DeviceGroup Functions
  // -------------------------------------

  getDeviceDeviceGroups(device) {
    return this.process(this.appliance.getDeviceDeviceGroups(device.id), 'device device_groups');
  }

  postDeviceDeviceGroups(device, { assign, unassign }) {
    return this.process(this.appliance.postDeviceDeviceGroups(device.id, { assign, unassign }), 'device device_groups');
  }

  postDeviceDeviceGroup(device, deviceGroup) {
    return this.process(this.appliance.postDeviceDeviceGroup(device.id, deviceGroup.id), 'device device_group');
  }

  deleteDeviceDeviceGroup(device, deviceGroup) {
    return this.process(this.appliance.deleteDeviceDeviceGroup(device.id, deviceGroup.id), 'device device_group');
  }

  // -------------------------------------
  // Software Functions
  // -------------------------------------

  getDeviceSoftware(device) {
    return this.process(this.appliance.getDeviceSoftware(device.id), 'device software');
  }

  // -------------------------------------
  // Tag Functions
  // -------------------------------------

  getDeviceTags(device) {
    return this.process(this.appliance.getDeviceTags(device.id), 'device tags');
  }

  postDeviceTags(device, { assign, unassign }) {
    return this.process(this.appliance.postDeviceTags(device.id, { assign, unassign }), 'device tags');
  }

  postDeviceTag(device, tag) {
    return this.process(this.appliance.postDeviceTag(device.id, tag.id), 'device tag');
  }

  deleteDeviceTag(device, tag) {
    return this.process(this.appliance.deleteDeviceDeviceGroup(device.id, tag.id), 'device tag');
  }

  // -------------------------------------
  // Trigger Functions
  // -------------------------------------

  getDeviceTriggers(device) {
    return this.process(this.appliance.getDeviceTriggers(device.id), 'device triggers');
  }

  postDeviceTriggers(device, { assign, unassign }) {
    return this.process(this.appliance.postDeviceTriggers(device.id, { assign, unassign }), 'device triggers');
  }

  postDeviceTrigger(device, trigger) {
    return this.process(this.appliance.postDeviceTrigger(device.id, trigger.id), 'device trigger');
  }

  deleteDeviceTrigger(device, trigger) {
    return this.process(this.appliance.deleteDeviceDeviceGroup(device.id, trigger.id), 'device trigger');
  }
};
