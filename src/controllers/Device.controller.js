// Device.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
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

  find({ search_type, value }, options = {}) {
    const { limit, offset, active_from, active_until } = options;
    const getDevices = this.appliance.getDevices(search_type, value, limit, offset, active_from, active_until);

    return new DeviceSet(this.process(getDevices, 'devices', { suppress: true }));
  }

  findAny(options) {
    return this.find({ search_type: Search.Types.Any, value: undefined }, options);
  }

  findByName(name, options) {
    return this.find({ search_type: Search.Types.Name, value: name }, options);
  }

  findByDiscoveryId(discoveryId, options) {
    return this.find({ search_type: Search.Types.DiscoveryId, value: discoveryId }, options);
  }

  findByIpAddress(ip, options) {
    return this.find({ search_type: Search.Types.IpAddress, value: ip }, options);
  }

  findByMacAddress(mac, options) {
    return this.find({ search_type: Search.Types.MacAddress, value: mac }, options);
  }

  findByVendor(vendor, options) {
    return this.find({ search_type: Search.Types.Vendor, value: vendor }, options);
  }

  findByType(type, options) {
    return this.find({ search_type: Search.Types.Type, value: type }, options);
  }

  findByTag(tag, options) {
    return this.find({ search_type: Search.Types.Tag, value: tag }, options);
  }

  findByActivity(activity, options) {
    return this.find({ search_type: Search.Types.Activity, value: activity }, options);
  }

  findByNode(node, options) {
    return this.find({ search_type: Search.Types.Node, value: node }, options);
  }

  findByVlan(vlan, options) {
    return this.find({ search_type: Search.Types.Vlan, value: vlan }, options);
  }

  findByDiscoverTime(discoverTime, options) {
    return this.find({ search_type: Search.Types.DiscoverTime, value: discoverTime }, options);
  }

  // -------------------------------------
  // Search - Custom
  // -------------------------------------

  findCustom({ field, value }, options = {}) {
    const { limit, offset = 0, activeFrom, activeUntil } = options;
    return this.findAny().filter(device => device[field] == value).slice(offset, limit);
  }

  findById(id, options) {
    return this.findCustom({ field: 'id', value: id }, options);
  }

  findByExtrahopId(extrahopId, options) {
    return this.findCustom({ field: 'extrahop_id', value: extrahopId }, options);
  }

  findByParentId(parentId, options) {
    return this.findCustom({ field: 'parent_id', value: parentId }, options);
  }

  // -------------------------------------
  // Search Functions
  // -------------------------------------

  search({ filter, limit, offset, active_from, active_until }) {
    const search = new DeviceSearch({ filter, limit, offset, active_from, active_until });
    console.log(search);
    // if ( filter instanceof Array ) {
    //   filter = filter[0] instanceof Array ? filter : [ filter ];
    //   const rules = filter.map(x => ({ field: x[0], operator: x[1], operand: x[2] }));
    //   search = new DeviceSearch({ rules, operator }, limit, offset, activeFrom, activeUntil);
    // }

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
    return this.appliance.getDevice(deviceId);
  }

  patchDevice(deviceId, payload) {
    return this.appliance.patchDevice(deviceId, payload);
  }

  postDevice(deviceId, payload) {
    return this.appliance.postDevice(deviceId, payload);
  }

  searchDevices(payload) {
    return this.appliance.postDeviceSearch(payload);
  }

  putDevice(payload) {
    return this.appliance.putDevice(payload);
  }

  getDeviceTags(deviceId) {
    return this.appliance.getDeviceTags(deviceId);
  }

  postDeviceTags(deviceId, payload) {
    return this.appliance.postDeviceTags(deviceId, payload);
  }

  postDeviceTag(deviceId, tagID) {
    return this.appliance.postDeviceTag(deviceId, tagID);
  }
}
