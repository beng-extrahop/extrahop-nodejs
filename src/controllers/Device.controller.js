// Device.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Device = require('../models/device/Device.model');
const DeviceSet = require('../models/device/DeviceSet.model');
const DeviceSearch = require('../models/device/DeviceSearch.model');
const DeviceActivity = require('../models/device/DeviceActivity.model');

const AlertSet = require('../models/alert/AlertSet.model');
const DashboardSet = require('../models/dashboard/DashboardSet.model');
const DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');
const SoftwareSet = require('../models/software/SoftwareSet.model');
const TagSet = require('../models/tag/TagSet.model');
const TriggerSet = require('../models/trigger/TriggerSet.model');

const { Search, Config, Icons } = require('../constants/Global.constants');

module.exports = class DeviceCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(device) {
    return device ? new Device(this.getDevice(device)) : new DeviceSet(this.getDevices());
  }

  getActivity(device) {
    return new DeviceActivity(this.getDeviceActivity(device));
  }

  getAlerts(device) {
    return new AlertSet(this.getDeviceAlerts(device));
  }

  getDashboards(device) {
    return new DashboardSet(this.getDeviceDashboards(device));
  }

  getDeviceGroups(device) {
    return new DeviceGroupSet(this.getDeviceDeviceGroups(device));
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

  search(options = {}) {
    return new DeviceSet(this.searchDevices(new DeviceSearch(options)));
  }

  update(device, data) {
    return this.patchDevice(device, data);
  }

  build(data) {
    return new Device(data);
  }

  // -------------------------------------
  // Find Functions
  // -------------------------------------

  find({ search_type, value } = {}) {
    const { limit, offset, active_from, active_until } = options;
    const getDevices = this.appliance.getDevices(search_type, value, limit, offset, active_from, active_until);

    return new DeviceSet(this.process(getDevices, 'devices', { suppress: true }));
  }

  findAny() {
    return this.find({ search_type: Search.Types.Any, value: undefined });
  }

  findByName(name) {
    return this.find({ search_type: Search.Types.Name, value: name });
  }

  findByDiscoveryId(discoveryId) {
    return this.find({ search_type: Search.Types.DiscoveryId, value: discoveryId });
  }

  findByIpAddress(ip) {
    return this.find({ search_type: Search.Types.IpAddress, value: ip });
  }

  findByMacAddress(mac) {
    return this.find({ search_type: Search.Types.MacAddress, value: mac });
  }

  findByVendor(vendor) {
    return this.find({ search_type: Search.Types.Vendor, value: vendor });
  }

  findByType(type) {
    return this.find({ search_type: Search.Types.Type, value: type });
  }

  findByTag(tag) {
    return this.find({ search_type: Search.Types.Tag, value: tag });
  }

  findByActivity(activity) {
    return this.find({ search_type: Search.Types.Activity, value: activity });
  }

  findByNode(node) {
    return this.find({ search_type: Search.Types.Node, value: node });
  }

  findByVlan(vlan) {
    return this.find({ search_type: Search.Types.Vlan, value: vlan });
  }

  findByDiscoverTime(discoverTime) {
    return this.find({ search_type: Search.Types.DiscoverTime, value: discoverTime });
  }

  // -------------------------------------
  // Find Functions - Custom
  // -------------------------------------

  findCustom({ field, value } = {}) {
    const { limit, offset = 0, activeFrom, activeUntil } = options;
    return this.findAny().filter(device => device[field] == value).slice(offset, limit);
  }

  findById(id) {
    return this.findCustom({ field: 'id', value: id });
  }

  findByExtrahopId(extrahopId) {
    return this.findCustom({ field: 'extrahop_id', value: extrahopId });
  }

  findByParentId(parentId) {
    return this.findCustom({ field: 'parent_id', value: parentId });
  }

  // -------------------------------------
  // Update Functions
  // -------------------------------------

  setDescription(device, description) {
    return this.update(device, { 'description': description });
  }

  setCustomName(device, customName) {
    return this.update(device, { 'custom_name': customName });
  }

  setCustomType(device, customType) {
    return this.update(device, { 'custom_type': customType });
  }

  setRole(device, role) {
    return this.update(device, { 'custom_type': role });
  }

  setVendor(device, vendor) {
    return this.update(device, { 'vendor': vendor });
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getDevices() {
    return this.process(this.appliance.getDevices(), 'devices');
  }

  getDevice(device) {
    return this.process(this.appliance.getDevice(device.id), 'device');
  }

  searchDevices(search) {
    return this.process(this.appliance.postDeviceSearch(search), 'devices');
  }

  patchDevice(device, data) {
    return this.process(this.appliance.patchDevice(device.id, data), 'device');
  }

  // -------------------------------------
  // Activity Functions
  // -------------------------------------

  getDeviceActivity(device) {
    return this.process(this.appliance.getDeviceActivity(device.id), 'device activity');
  }

  // -------------------------------------
  // Alert Functions
  // -------------------------------------

  getDeviceAlerts(device) {
    return this.process(this.appliance.getDeviceAlerts(device.id), 'device alerts');
  }

  postDeviceAlerts(device, assign = [], unassign = []) {
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
    return this.process(this.appliance.getDeviceDeviceGroups(device.id), 'device deviceGroups');
  }

  postDeviceDeviceGroups(device, assign = [], unassign = []) {
    return this.process(this.appliance.postDeviceDeviceGroups(device.id, { assign, unassign }), 'device deviceGroups');
  }

  postDeviceDeviceGroup(device, deviceGroup) {
    return this.process(this.appliance.postDeviceDeviceGroup(device.id, deviceGroup.id), 'device deviceGroup');
  }

  deleteDeviceDeviceGroup(device, deviceGroup) {
    return this.process(this.appliance.deleteDeviceDeviceGroup(device.id, deviceGroup.id), 'device deviceGroup');
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

  postDeviceTags(device, assign = [], unassign = []) {
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

  postDeviceTriggers(device, assign = [], unassign = []) {
    return this.process(this.appliance.postDeviceTriggers(device.id, { assign, unassign }), 'device triggers');
  }

  postDeviceTrigger(device, trigger) {
    return this.process(this.appliance.postDeviceTrigger(device.id, trigger.id), 'device trigger');
  }

  deleteDeviceTrigger(device, trigger) {
    return this.process(this.appliance.deleteDeviceDeviceGroup(device.id, trigger.id), 'device trigger');
  }

}
