// Device.controller.js

const BaseCtrl = require('../controllers/BaseCtrl.controller');
const DeviceSet = require('../models/devices/DeviceSet.model');
const DeviceSearch = require('../models/devices/DeviceSearch.model');
const Strings = require('../constants/Device.constants');

const { Config, Icons } = require('../constants/Global.constants');

module.exports = class DeviceCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  // -------------------------------------
  // Save Functions
  // -------------------------------------

  saveToCSV(search = {}) {
    search.db.find({}, function(err, results) {
      if ( err ) {
        console.error(err);
      } else {
        (new DeviceSet(results)).writeToCSV(`${Config.DATA_DIR}/csv/devices-${search.id}.csv`);
        console.log(`${Icons.Success} Saved ${results.length} results to CSV: devices-${search.id}.csv`);
      }
    });
  }

  // -------------------------------------
  // Search - Global
  // -------------------------------------

  findAll(limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Any]: undefined
    }, limit, offset, activeFrom, activeUntil);
  }

  findAllCustom(limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Type]: 'custom'
    }, limit, offset, activeFrom, activeUntil);
  }

  // -------------------------------------
  // Search - Predefined
  // -------------------------------------

  findByName(name, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Name]: name
    }, limit, offset, activeFrom, activeUntil);
  }

  findByDiscoveryId(discoveryId, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.DiscoveryId]: discoveryId
    }, limit, offset, activeFrom, activeUntil);
  }

  findByIpAddress(ip, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.IpAddress]: ip
    }, limit, offset, activeFrom, activeUntil);
  }

  findByMacAddress(mac, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.MacAddress]: mac
    }, limit, offset, activeFrom, activeUntil);
  }

  findByVendor(vendor, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Vendor]: vendor
    }, limit, offset, activeFrom, activeUntil);
  }

  findByType(type, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Type]: type
    }, limit, offset, activeFrom, activeUntil);
  }

  findByTag(tag, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Tag]: tag
    }, limit, offset, activeFrom, activeUntil);
  }

  findByActivity(activity, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Activity]: activity
    }, limit, offset, activeFrom, activeUntil);
  }

  findByNode(node, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Node]: node
    }, limit, offset, activeFrom, activeUntil);
  }

  findByVlan(vlan, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.Vlan]: vlan
    }, limit, offset, activeFrom, activeUntil);
  }

  findByDiscoverTime(discoverTime, limit, offset, activeFrom, activeUntil) {
    return this.find({
      [Strings.Search.Types.DiscoverTime]: discoverTime
    }, limit, offset, activeFrom, activeUntil);
  }

  // -------------------------------------
  // Search - Custom
  // -------------------------------------

  findById(id, filter, limit, offset, activeFrom, activeUntil) {
    return this.customSearch({
      'id': id
    }, filter, limit, offset, activeFrom, activeUntil);
  }

  findByExtrahopId(extrahopId, filter, limit, offset, activeFrom, activeUntil) {
    return this.customSearch({
      'extrahop_id': extrahopId
    }, filter, limit, offset, activeFrom, activeUntil);
  }

  findByParentId(parentId, filter, limit, offset, activeFrom, activeUntil) {
    return this.customSearch({
      'parent_id': parentId
    }, filter, limit, offset, activeFrom, activeUntil);
  }

  // -------------------------------------
  // Search Functions
  // -------------------------------------

  find(filter, limit, offset, activeFrom, activeUntil) {
    const searchType = Object.keys(filter)[0];
    const value = filter[searchType];

    const getDevices = this.appliance.getDevices(searchType, value, limit, offset, activeFrom, activeUntil);
    return new DeviceSet(this.process(getDevices, 'devices'));
  }

  findOne(searchType, value, offset, activeFrom, activeUntil) {
    const getDevices = this.appliance.getDevices(searchType, value, 1, offset, activeFrom, activeUntil);
    return new DeviceSet(this.process(getDevices, 'devices'));
  }

  search(filters, operator, limit, offset, activeFrom, activeUntil) {
    filters = filters && filters[0] instanceof Array ? filters : [ filters ];

    const rules = filters.map(filter => ({
      field: filter[0],
      operator: filter[1],
      operand: filter[2]
    }));

    const search = new DeviceSearch({ rules, operator }, limit, offset, activeFrom, activeUntil);
    console.log(JSON.stringify(search,null,2));

    return new DeviceSet(this.process(this.appliance.searchDevices(search), 'devices'));
  }

  // -------------------------------------
  // Update Functions
  // -------------------------------------

  setDescription(device, description) {
    return this.patchDevice(device.id, {
      'description': description
    });
  }

  setCustomName(device, customName) {
    return this.patchDevice(device.id, {
      'custom_name': customName
    });
  }

  setCustomType(device, customType) {
    return this.patchDevice(device.id, {
      'custom_type': customType
    });
  }

  setRole(device, role) {
    return this.patchDevice(device.id, {
      'custom_type': role
    });
  }

  setVendor(device, vendor) {
    return this.patchDevice(device.id, {
      'vendor': vendor
    });
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
