// Device.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const DeviceSet = require('../models/device/DeviceSet.model');
const DeviceSearch = require('../models/device/DeviceSearch.model');

const { Search, Config, Icons } = require('../constants/Global.constants');

module.exports = class DeviceCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Search - Predefined
  // -------------------------------------

  find({ search_type, value } = {}) {
    const { limit, offset, active_from, active_until } = options;
    const getDevices = this.appliance.getDevices(search_type, value, limit, offset, active_from, active_until);

    return new DeviceSet(this.process(getDevices, 'devices', { suppress: true }));
  }

  findAny(options) {
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
  // Search - Custom
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
  // Search Functions
  // -------------------------------------

  search({ filter, limit, offset, active_from, active_until }) {
    const search = new DeviceSearch({ filter, limit, offset, active_from, active_until });
    return new DeviceSet(this.process(this.searchDevices(search), 'devices'));
  }

  // -------------------------------------
  // Update Functions
  // -------------------------------------

  setDescription(device, description) {
    return this.patchDevice(device.id, { 'description': description });
  }

  setCustomName(device, customName) {
    return this.patchDevice(device.id, { 'custom_name': customName });
  }

  setCustomType(device, customType) {
    return this.patchDevice(device.id, { 'custom_type': customType });
  }

  setRole(device, role) {
    return this.patchDevice(device.id, { 'custom_type': role });
  }

  setVendor(device, vendor) {
    return this.patchDevice(device.id, { 'vendor': vendor });
  }

  // -------------------------------------
  // API Functions
  // -------------------------------------

  getDevice(deviceId) {
    return this.process(this.appliance.getDevice(deviceId), 'device');
  }

  patchDevice(deviceId, payload) {
    return this.process(this.appliance.patchDevice(deviceId, payload), 'device');
  }

  postDevice(deviceId, payload) {
    return this.process(this.appliance.postDevice(deviceId, payload), 'device');
  }

  searchDevices(payload) {
    return this.process(this.appliance.postDeviceSearch(payload), 'devices');
  }

  putDevice(payload) {
    return this.process(this.appliance.putDevice(payload), 'device');
  }

  getDeviceTags(deviceId) {
    return this.process(this.appliance.getDeviceTags(deviceId), 'device tags');
  }

  postDeviceTags(deviceId, payload) {
    return this.process(this.appliance.postDeviceTags(deviceId, payload), 'device tags');
  }

  postDeviceTag(deviceId, tagID) {
    return this.process(this.appliance.postDeviceTag(deviceId, tagID), 'device tag');
  }
}
