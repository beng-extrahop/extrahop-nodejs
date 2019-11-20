'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Device.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var DeviceSet = require('../models/device/DeviceSet.model');
var DeviceSearch = require('../models/device/DeviceSearch.model');
var DeviceActivity = require('../models/device/DeviceActivity.model');

var AlertSet = require('../models/alert/AlertSet.model');
var DashboardSet = require('../models/dashboard/DashboardSet.model');
var DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');
var SoftwareSet = require('../models/software/SoftwareSet.model');
var TagSet = require('../models/tag/TagSet.model');
var TriggerSet = require('../models/trigger/TriggerSet.model');

var _require = require('../constants/Global.constants'),
    Search = _require.Search;

module.exports = function (_BaseCtrl) {
  _inherits(DeviceCtrl, _BaseCtrl);

  function DeviceCtrl() {
    _classCallCheck(this, DeviceCtrl);

    return _possibleConstructorReturn(this, (DeviceCtrl.__proto__ || Object.getPrototypeOf(DeviceCtrl)).apply(this, arguments));
  }

  _createClass(DeviceCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (Function.prototype.bind.apply(DeviceSet, [null].concat(_toConsumableArray(this.getDevices(params)))))();
    }
  }, {
    key: 'search',
    value: function search() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (Function.prototype.bind.apply(DeviceSet, [null].concat(_toConsumableArray(this.searchDevices(new DeviceSearch(options))))))();
    }
  }, {
    key: 'update',
    value: function update(device, data) {
      return this.patchDevice(device, data);
    }
  }, {
    key: 'getActivity',
    value: function getActivity(device) {
      return new DeviceActivity(this.getDeviceActivity(device));
    }
  }, {
    key: 'getAlerts',
    value: function getAlerts(device) {
      return new (Function.prototype.bind.apply(AlertSet, [null].concat(_toConsumableArray(this.getDeviceAlerts(device)))))();
    }
  }, {
    key: 'assignAlert',
    value: function assignAlert(device, alert) {
      return this.postDeviceAlert(device, alert);
    }
  }, {
    key: 'assignAlerts',
    value: function assignAlerts(device, alerts) {
      return this.postDeviceAlerts(device, { assign: alerts.map(function (alert) {
          return alert.id;
        }) });
    }
  }, {
    key: 'removeAlert',
    value: function removeAlert(device, alert) {
      return this.deleteDeviceAlert(device, alert);
    }
  }, {
    key: 'removeAlerts',
    value: function removeAlerts(device, alerts) {
      return this.postDeviceAlerts(device, { unassign: alerts.map(function (alert) {
          return alert.id;
        }) });
    }
  }, {
    key: 'getDashboards',
    value: function getDashboards(device) {
      return new (Function.prototype.bind.apply(DashboardSet, [null].concat(_toConsumableArray(this.getDeviceDashboards(device)))))();
    }
  }, {
    key: 'getDeviceGroups',
    value: function getDeviceGroups(device) {
      return new (Function.prototype.bind.apply(DeviceGroupSet, [null].concat(_toConsumableArray(this.getDeviceDeviceGroups(device)))))();
    }
  }, {
    key: 'assignDeviceGroup',
    value: function assignDeviceGroup(device, deviceGroup) {
      return this.postDeviceDeviceGroup(device, deviceGroup);
    }
  }, {
    key: 'assignDeviceGroups',
    value: function assignDeviceGroups(device, deviceGroups) {
      return this.postDeviceDeviceGroups(device, { assign: deviceGroups.map(function (deviceGroup) {
          return deviceGroup.id;
        }) });
    }
  }, {
    key: 'removeDeviceGroup',
    value: function removeDeviceGroup(device, deviceGroup) {
      return this.deleteDeviceDeviceGroup(device, deviceGroup);
    }
  }, {
    key: 'removeDeviceGroups',
    value: function removeDeviceGroups(device, deviceGroups) {
      return this.postDeviceDeviceGroups(device, { unassign: deviceGroups.map(function (deviceGroup) {
          return deviceGroup.id;
        }) });
    }
  }, {
    key: 'getSoftware',
    value: function getSoftware(device) {
      return new (Function.prototype.bind.apply(SoftwareSet, [null].concat(_toConsumableArray(this.getDeviceSoftware(device)))))();
    }
  }, {
    key: 'getTags',
    value: function getTags(device) {
      return new (Function.prototype.bind.apply(TagSet, [null].concat(_toConsumableArray(this.getDeviceTags(device)))))();
    }
  }, {
    key: 'getTriggers',
    value: function getTriggers(device) {
      return new (Function.prototype.bind.apply(TriggerSet, [null].concat(_toConsumableArray(this.getDeviceTriggers(device)))))();
    }
  }, {
    key: 'assignTrigger',
    value: function assignTrigger(device, trigger) {
      return this.postDeviceTrigger(device, trigger);
    }
  }, {
    key: 'assignTriggers',
    value: function assignTriggers(device, triggers) {
      return this.postDeviceTriggers(device, { assign: triggers.map(function (trigger) {
          return trigger.id;
        }) });
    }
  }, {
    key: 'removeTrigger',
    value: function removeTrigger(device, trigger) {
      return this.deleteDeviceTrigger(device, trigger);
    }
  }, {
    key: 'removeTriggers',
    value: function removeTriggers(device, triggers) {
      return this.postDeviceTriggers(device, { unassign: triggers.map(function (trigger) {
          return trigger.id;
        }) });
    }

    // -------------------------------------
    // Helper Functions - GET
    // -------------------------------------

  }, {
    key: 'getAll',
    value: function getAll() {
      return this.get({ search_type: 'any', limit: -1 });
    }
  }, {
    key: 'getByName',
    value: function getByName(name) {
      return this.get({ search_type: 'name', value: name });
    }
  }, {
    key: 'getByDiscoveryId',
    value: function getByDiscoveryId(discoveryId) {
      return this.get({ search_type: Search.Types.DiscoveryId, value: discoveryId });
    }
  }, {
    key: 'getByIpAddress',
    value: function getByIpAddress(ip) {
      return this.get({ search_type: Search.Types.IpAddress, value: ip });
    }
  }, {
    key: 'getByMacAddress',
    value: function getByMacAddress(mac) {
      return this.get({ search_type: Search.Types.MacAddress, value: mac });
    }
  }, {
    key: 'getByVendor',
    value: function getByVendor(vendor) {
      return this.get({ search_type: Search.Types.Vendor, value: vendor });
    }
  }, {
    key: 'getByType',
    value: function getByType(type) {
      return this.get({ search_type: Search.Types.Type, value: type });
    }
  }, {
    key: 'getByTag',
    value: function getByTag(tag) {
      return this.get({ search_type: Search.Types.Tag, value: tag });
    }
  }, {
    key: 'getByActivity',
    value: function getByActivity(activity) {
      return this.get({ search_type: Search.Types.Activity, value: activity });
    }
  }, {
    key: 'getByNode',
    value: function getByNode(node) {
      return this.get({ search_type: Search.Types.Node, value: node });
    }
  }, {
    key: 'getByVlan',
    value: function getByVlan(vlan) {
      return this.get({ search_type: Search.Types.Vlan, value: vlan });
    }
  }, {
    key: 'getByDiscoverTime',
    value: function getByDiscoverTime(discoverTime) {
      return this.get({ search_type: Search.Types.DiscoverTime, value: discoverTime });
    }

    // -------------------------------------
    // Find Functions - Custom
    // -------------------------------------

  }, {
    key: 'getById',
    value: function getById(id) {
      return this.getAll().with({ id: id });
    }
  }, {
    key: 'getByExtrahopId',
    value: function getByExtrahopId(extrahopId) {
      return this.getAll().with({ extrahop_id: extrahopId });
    }
  }, {
    key: 'getByParentId',
    value: function getByParentId(parentId) {
      return this.getAll().with({ parent_id: parentId });
    }
  }, {
    key: 'getCustom',
    value: function getCustom() {
      return this.getAll().with({ custom_type: 'custom' });
    }

    // -------------------------------------
    // Update Functions
    // -------------------------------------

  }, {
    key: 'setDescription',
    value: function setDescription(device, description) {
      return this.update(device, { description: description });
    }
  }, {
    key: 'setCustomName',
    value: function setCustomName(device, customName) {
      return this.update(device, { custom_name: customName });
    }
  }, {
    key: 'setCustomType',
    value: function setCustomType(device, customType) {
      return this.update(device, { custom_type: customType });
    }
  }, {
    key: 'setRole',
    value: function setRole(device, role) {
      return this.update(device, { custom_type: role });
    }
  }, {
    key: 'setVendor',
    value: function setVendor(device, vendor) {
      return this.update(device, { vendor: vendor });
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getDevices',
    value: function getDevices(params) {
      return this.process(this.appliance.getDevices(params), 'devices');
    }
  }, {
    key: 'getDevice',
    value: function getDevice(device) {
      return this.process(this.appliance.getDevice(device.id), 'device');
    }
  }, {
    key: 'searchDevices',
    value: function searchDevices(search) {
      return this.process(this.appliance.postDeviceSearch(search), 'devices');
    }
  }, {
    key: 'patchDevice',
    value: function patchDevice(device, data) {
      return this.process(this.appliance.patchDevice(device.id, data), 'device (id: ' + device.id + ')');
    }

    // -------------------------------------
    // Activity Functions
    // -------------------------------------

  }, {
    key: 'getDeviceActivity',
    value: function getDeviceActivity(device) {
      return this.process(this.appliance.getDeviceActivity(device.id), 'device activity');
    }

    // -------------------------------------
    // Alert Functions
    // -------------------------------------

  }, {
    key: 'getDeviceAlerts',
    value: function getDeviceAlerts(device) {
      return this.process(this.appliance.getDeviceAlerts(device.id), 'device alerts');
    }
  }, {
    key: 'postDeviceAlerts',
    value: function postDeviceAlerts(device, _ref) {
      var assign = _ref.assign,
          unassign = _ref.unassign;

      return this.process(this.appliance.postDeviceAlerts(device.id, { assign: assign, unassign: unassign }), 'device alerts');
    }
  }, {
    key: 'postDeviceAlert',
    value: function postDeviceAlert(device, alert) {
      return this.process(this.appliance.postDeviceAlert(device.id, alert.id), 'device alert');
    }
  }, {
    key: 'deleteDeviceAlert',
    value: function deleteDeviceAlert(device, alert) {
      return this.process(this.appliance.deleteDeviceAlert(device.id, alert.id), 'device alert');
    }

    // -------------------------------------
    // Dashboard Functions
    // -------------------------------------

  }, {
    key: 'getDeviceDashboards',
    value: function getDeviceDashboards(device) {
      return this.process(this.appliance.getDeviceDashboards(device.id), 'device dashboards');
    }

    // -------------------------------------
    // DeviceGroup Functions
    // -------------------------------------

  }, {
    key: 'getDeviceDeviceGroups',
    value: function getDeviceDeviceGroups(device) {
      return this.process(this.appliance.getDeviceDeviceGroups(device.id), 'device deviceGroups');
    }
  }, {
    key: 'postDeviceDeviceGroups',
    value: function postDeviceDeviceGroups(device, _ref2) {
      var assign = _ref2.assign,
          unassign = _ref2.unassign;

      return this.process(this.appliance.postDeviceDeviceGroups(device.id, { assign: assign, unassign: unassign }), 'device deviceGroups');
    }
  }, {
    key: 'postDeviceDeviceGroup',
    value: function postDeviceDeviceGroup(device, deviceGroup) {
      return this.process(this.appliance.postDeviceDeviceGroup(device.id, deviceGroup.id), 'device deviceGroup');
    }
  }, {
    key: 'deleteDeviceDeviceGroup',
    value: function deleteDeviceDeviceGroup(device, deviceGroup) {
      return this.process(this.appliance.deleteDeviceDeviceGroup(device.id, deviceGroup.id), 'device device group');
    }

    // -------------------------------------
    // Software Functions
    // -------------------------------------

  }, {
    key: 'getDeviceSoftware',
    value: function getDeviceSoftware(device) {
      return this.process(this.appliance.getDeviceSoftware(device.id), 'device software');
    }

    // -------------------------------------
    // Tag Functions
    // -------------------------------------

  }, {
    key: 'getDeviceTags',
    value: function getDeviceTags(device) {
      return this.process(this.appliance.getDeviceTags(device.id), 'device tags');
    }
  }, {
    key: 'postDeviceTags',
    value: function postDeviceTags(device, _ref3) {
      var assign = _ref3.assign,
          unassign = _ref3.unassign;

      return this.process(this.appliance.postDeviceTags(device.id, { assign: assign, unassign: unassign }), 'device tags');
    }
  }, {
    key: 'postDeviceTag',
    value: function postDeviceTag(device, tag) {
      return this.process(this.appliance.postDeviceTag(device.id, tag.id), 'device tag');
    }
  }, {
    key: 'deleteDeviceTag',
    value: function deleteDeviceTag(device, tag) {
      return this.process(this.appliance.deleteDeviceDeviceGroup(device.id, tag.id), 'device tag');
    }

    // -------------------------------------
    // Trigger Functions
    // -------------------------------------

  }, {
    key: 'getDeviceTriggers',
    value: function getDeviceTriggers(device) {
      return this.process(this.appliance.getDeviceTriggers(device.id), 'device triggers');
    }
  }, {
    key: 'postDeviceTriggers',
    value: function postDeviceTriggers(device, _ref4) {
      var assign = _ref4.assign,
          unassign = _ref4.unassign;

      return this.process(this.appliance.postDeviceTriggers(device.id, { assign: assign, unassign: unassign }), 'device triggers');
    }
  }, {
    key: 'postDeviceTrigger',
    value: function postDeviceTrigger(device, trigger) {
      return this.process(this.appliance.postDeviceTrigger(device.id, trigger.id), 'device trigger');
    }
  }, {
    key: 'deleteDeviceTrigger',
    value: function deleteDeviceTrigger(device, trigger) {
      return this.process(this.appliance.deleteDeviceDeviceGroup(device.id, trigger.id), 'device trigger');
    }
  }]);

  return DeviceCtrl;
}(BaseCtrl);
//# sourceMappingURL=Device.controller.js.map