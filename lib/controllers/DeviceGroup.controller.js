'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// DeviceGroup.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var DeviceGroup = require('../models/deviceGroup/DeviceGroup.model');
var DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');

var AlertSet = require('../models/alert/AlertSet.model');
var DashboardSet = require('../models/dashboard/DashboardSet.model');
var DeviceSet = require('../models/device/DeviceSet.model');
var TriggerSet = require('../models/trigger/TriggerSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(DeviceGroupCtrl, _BaseCtrl);

  function DeviceGroupCtrl() {
    _classCallCheck(this, DeviceGroupCtrl);

    return _possibleConstructorReturn(this, (DeviceGroupCtrl.__proto__ || Object.getPrototypeOf(DeviceGroupCtrl)).apply(this, arguments));
  }

  _createClass(DeviceGroupCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new (Function.prototype.bind.apply(DeviceGroupSet, [null].concat(_toConsumableArray(this.getDeviceGroups(params)))))();
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.postDeviceGroup(new DeviceGroup(data));
    }
  }, {
    key: 'update',
    value: function update(deviceGroup, data) {
      return this.patchDeviceGroup(deviceGroup, data);
    }
  }, {
    key: 'delete',
    value: function _delete(deviceGroup) {
      return this.deleteDeviceGroup(deviceGroup);
    }
  }, {
    key: 'getAlerts',
    value: function getAlerts(deviceGroup) {
      return new (Function.prototype.bind.apply(AlertSet, [null].concat(_toConsumableArray(this.getDeviceGroupAlerts(deviceGroup)))))();
    }
  }, {
    key: 'assignAlert',
    value: function assignAlert(deviceGroup, alert) {
      return this.postDeviceGroupAlert(deviceGroup, alert);
    }
  }, {
    key: 'assignAlerts',
    value: function assignAlerts(deviceGroup, alerts) {
      return this.postDeviceGroupAlerts(deviceGroup, { assign: alerts.map(function (alert) {
          return alert.id;
        }) });
    }
  }, {
    key: 'removeAlert',
    value: function removeAlert(deviceGroup, alert) {
      return this.deleteDeviceGroupAlert(deviceGroup, alert);
    }
  }, {
    key: 'removeAlerts',
    value: function removeAlerts(deviceGroup, alerts) {
      return this.postDeviceGroupAlerts(deviceGroup, { unassign: alerts.map(function (alert) {
          return alert.id;
        }) });
    }
  }, {
    key: 'getDashboards',
    value: function getDashboards(deviceGroup) {
      return new (Function.prototype.bind.apply(DashboardSet, [null].concat(_toConsumableArray(this.getDeviceGroupDashboards(deviceGroup)))))();
    }
  }, {
    key: 'getDevices',
    value: function getDevices(deviceGroup) {
      return new (Function.prototype.bind.apply(DeviceSet, [null].concat(_toConsumableArray(this.getDeviceGroupDevices(deviceGroup)))))();
    }
  }, {
    key: 'assignDevice',
    value: function assignDevice(deviceGroup, device) {
      return this.postDeviceGroupDevice(deviceGroup, device);
    }
  }, {
    key: 'assignDevices',
    value: function assignDevices(deviceGroup, devices) {
      return this.postDeviceGroupDevices(deviceGroup, { assign: devices.map(function (device) {
          return device.id;
        }) });
    }
  }, {
    key: 'removeDevice',
    value: function removeDevice(deviceGroup, device) {
      return this.deleteDeviceGroupDevice(deviceGroup, device);
    }
  }, {
    key: 'removeDevices',
    value: function removeDevices(deviceGroup, devices) {
      return this.postDeviceGroupDevices(deviceGroup, { unassign: devices.map(function (device) {
          return device.id;
        }) });
    }
  }, {
    key: 'getTriggers',
    value: function getTriggers(deviceGroup) {
      return new (Function.prototype.bind.apply(TriggerSet, [null].concat(_toConsumableArray(this.getDeviceGroupTriggers(deviceGroup)))))();
    }
  }, {
    key: 'assignTrigger',
    value: function assignTrigger(deviceGroup, trigger) {
      return this.postDeviceGroupTrigger(deviceGroup, trigger);
    }
  }, {
    key: 'assignTriggers',
    value: function assignTriggers(deviceGroup, triggers) {
      return this.postDeviceGroupTriggers(deviceGroup, { assign: triggers.map(function (trigger) {
          return trigger.id;
        }) });
    }
  }, {
    key: 'removeTrigger',
    value: function removeTrigger(deviceGroup, trigger) {
      return this.deleteDeviceGroupTrigger(deviceGroup, trigger);
    }
  }, {
    key: 'removeTriggers',
    value: function removeTriggers(deviceGroup, triggers) {
      return this.postDeviceGroupTriggers(deviceGroup, { unassign: triggers.map(function (trigger) {
          return trigger.id;
        }) });
    }

    // -------------------------------------
    // Update Functions
    // -------------------------------------

  }, {
    key: 'enable',
    value: function enable(deviceGroup) {
      var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!deviceGroup.disabled && skip) {
        return null;
      }

      return this.patchDeviceGroup(deviceGroup, { disabled: false });
    }
  }, {
    key: 'disable',
    value: function disable(deviceGroup) {
      var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (deviceGroup.disabled && skip) {
        return null;
      }

      return this.patchDeviceGroup(deviceGroup, { disabled: true });
    }
  }, {
    key: 'toggle',
    value: function toggle(deviceGroup) {
      return this.patchDeviceGroup(deviceGroup, { disabled: !deviceGroup.disabled });
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getDeviceGroups',
    value: function getDeviceGroups(params) {
      return this.process(this.appliance.getDeviceGroups(params), 'deviceGroups');
    }
  }, {
    key: 'getDeviceGroup',
    value: function getDeviceGroup(deviceGroup) {
      return this.process(this.appliance.getDeviceGroup(deviceGroup.id), 'deviceGroup');
    }
  }, {
    key: 'postDeviceGroup',
    value: function postDeviceGroup(deviceGroup) {
      return this.process(this.appliance.postDeviceGroup(deviceGroup), 'deviceGroup');
    }
  }, {
    key: 'patchDeviceGroup',
    value: function patchDeviceGroup(deviceGroup, data) {
      return this.process(this.appliance.patchDeviceGroup(deviceGroup.id, data), 'deviceGroup (id: ' + deviceGroup.id + ')');
    }
  }, {
    key: 'deleteDeviceGroup',
    value: function deleteDeviceGroup(deviceGroup) {
      return this.process(this.appliance.deleteDeviceGroup(deviceGroup.id), 'deviceGroup (id: ' + deviceGroup.id + ')');
    }

    // -------------------------------------
    // Alert Functions
    // -------------------------------------

  }, {
    key: 'getDeviceGroupAlerts',
    value: function getDeviceGroupAlerts(deviceGroup) {
      return this.process(this.appliance.getDeviceGroupAlerts(deviceGroup.id), 'deviceGroup alerts');
    }
  }, {
    key: 'postDeviceGroupAlerts',
    value: function postDeviceGroupAlerts(deviceGroup, _ref) {
      var assign = _ref.assign,
          unassign = _ref.unassign;

      return this.process(this.appliance.postDeviceGroupAlerts(deviceGroup.id, { assign: assign, unassign: unassign }), 'deviceGroup alerts');
    }
  }, {
    key: 'postDeviceGroupAlert',
    value: function postDeviceGroupAlert(deviceGroup, alert) {
      return this.process(this.appliance.postDeviceGroupAlert(deviceGroup.id, alert.id), 'deviceGroup alert');
    }
  }, {
    key: 'deleteDeviceGroupAlert',
    value: function deleteDeviceGroupAlert(deviceGroup, alert) {
      return this.process(this.appliance.deleteDeviceGroupAlert(deviceGroup.id, alert.id), 'deviceGroup alert');
    }

    // -------------------------------------
    // Dashboard Functions
    // -------------------------------------

  }, {
    key: 'getDeviceGroupDashboards',
    value: function getDeviceGroupDashboards(deviceGroup) {
      return this.process(this.appliance.getDeviceGroupDashboards(deviceGroup.id), 'deviceGroup dashboards');
    }

    // -------------------------------------
    // Device Functions
    // -------------------------------------

  }, {
    key: 'getDeviceGroupDevices',
    value: function getDeviceGroupDevices(deviceGroup, params) {
      return this.process(this.appliance.getDeviceGroupDevices(deviceGroup.id, params), 'deviceGroup devices');
    }
  }, {
    key: 'postDeviceGroupDevices',
    value: function postDeviceGroupDevices(deviceGroup, _ref2) {
      var assign = _ref2.assign,
          unassign = _ref2.unassign;

      return this.process(this.appliance.postDeviceGroupDevices(deviceGroup.id, { assign: assign, unassign: unassign }), 'deviceGroup devices');
    }
  }, {
    key: 'postDeviceGroupDevice',
    value: function postDeviceGroupDevice(deviceGroup, device) {
      return this.process(this.appliance.postDeviceGroupDevice(deviceGroup.id, device.id), 'deviceGroup device');
    }
  }, {
    key: 'deleteDeviceGroupDevice',
    value: function deleteDeviceGroupDevice(deviceGroup, device) {
      return this.process(this.appliance.deleteDeviceGroupDevice(deviceGroup.id, device.id), 'deviceGroup device');
    }

    // -------------------------------------
    // Trigger Functions
    // -------------------------------------

  }, {
    key: 'getDeviceGroupTriggers',
    value: function getDeviceGroupTriggers(deviceGroup) {
      return this.process(this.appliance.getDeviceGroupTriggers(deviceGroup.id), 'deviceGroup triggers');
    }
  }, {
    key: 'postDeviceGroupTriggers',
    value: function postDeviceGroupTriggers(deviceGroup, _ref3) {
      var assign = _ref3.assign,
          unassign = _ref3.unassign;

      return this.process(this.appliance.postDeviceGroupTriggers(deviceGroup.id, { assign: assign, unassign: unassign }), 'deviceGroup triggers');
    }
  }, {
    key: 'postDeviceGroupTrigger',
    value: function postDeviceGroupTrigger(deviceGroup, trigger) {
      return this.process(this.appliance.postDeviceGroupTrigger(deviceGroup.id, trigger.id), 'deviceGroup trigger');
    }
  }, {
    key: 'deleteDeviceGroupTrigger',
    value: function deleteDeviceGroupTrigger(deviceGroup, trigger) {
      return this.process(this.appliance.deleteDeviceGroupDevice(deviceGroup.id, trigger.id), 'deviceGroup trigger');
    }
  }]);

  return DeviceGroupCtrl;
}(BaseCtrl);
//# sourceMappingURL=DeviceGroup.controller.js.map