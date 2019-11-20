'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Alert.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Alert = require('../models/alert/Alert.model');
var AlertSet = require('../models/alert/AlertSet.model');
var AlertStatSet = require('../models/alert/AlertStatSet.model');
var ApplicationSet = require('../models/application/ApplicationSet.model');
var DeviceSet = require('../models/device/DeviceSet.model');
var DeviceGroupSet = require('../models/deviceGroup/DeviceGroupSet.model');
var EmailGroupSet = require('../models/emailGroup/EmailGroupSet.model');
var ExclusionIntervalSet = require('../models/exclusionInterval/ExclusionIntervalSet.model');
var NetworkSet = require('../models/network/NetworkSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(AlertCtrl, _BaseCtrl);

  function AlertCtrl() {
    _classCallCheck(this, AlertCtrl);

    return _possibleConstructorReturn(this, (AlertCtrl.__proto__ || Object.getPrototypeOf(AlertCtrl)).apply(this, arguments));
  }

  _createClass(AlertCtrl, [{
    key: 'get',


    // -------------------------------------
    // Aliases
    // -------------------------------------

    value: function get(alert) {
      return alert ? new Alert(this.getAlert(alert)) : new (Function.prototype.bind.apply(AlertSet, [null].concat(_toConsumableArray(this.getAlerts()))))();
    }
  }, {
    key: 'post',
    value: function post(data) {
      return this.postAlert(new Alert(data));
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.post(data);
    }
  }, {
    key: 'update',
    value: function update(alert, data) {
      return this.patchAlert(alert, data);
    }
  }, {
    key: 'delete',
    value: function _delete(alert) {
      return this.deleteAlert(alert);
    }
  }, {
    key: 'getApplications',
    value: function getApplications(alert) {
      return new (Function.prototype.bind.apply(ApplicationSet, [null].concat(_toConsumableArray(this.getAlertApplications(alert)))))();
    }
  }, {
    key: 'getDevices',
    value: function getDevices(alert) {
      return new (Function.prototype.bind.apply(DeviceSet, [null].concat(_toConsumableArray(this.getAlertDevices(alert)))))();
    }
  }, {
    key: 'getDeviceGroups',
    value: function getDeviceGroups(alert) {
      return new (Function.prototype.bind.apply(DeviceGroupSet, [null].concat(_toConsumableArray(this.getAlertDeviceGroups(alert)))))();
    }
  }, {
    key: 'getEmailGroups',
    value: function getEmailGroups(alert) {
      return new (Function.prototype.bind.apply(EmailGroupSet, [null].concat(_toConsumableArray(this.getAlertEmailGroups(alert)))))();
    }
  }, {
    key: 'getExclusionIntervals',
    value: function getExclusionIntervals(alert) {
      return new (Function.prototype.bind.apply(ExclusionIntervalSet, [null].concat(_toConsumableArray(this.getAlertExclusionIntervals(alert)))))();
    }
  }, {
    key: 'getNetworks',
    value: function getNetworks(alert) {
      return new (Function.prototype.bind.apply(NetworkSet, [null].concat(_toConsumableArray(this.getAlertNetworks(alert)))))();
    }
  }, {
    key: 'getStats',
    value: function getStats(alert) {
      return new (Function.prototype.bind.apply(AlertStatSet, [null].concat(_toConsumableArray(this.getAlertStats(alert)))))();
    }
  }, {
    key: 'assignApplications',
    value: function assignApplications(alert, applications) {
      if (!applications) return this.printError('assign', 'applications', 'Array[...applications] or { application } is required');

      return applications instanceof Array ? this.postAlertApplications(alert, { assign: applications }) : this.postAlertApplication(alert, applications);
    }
  }, {
    key: 'assignDevices',
    value: function assignDevices(alert, devices) {
      if (!devices) return this.printError('assign', 'devices', 'Array[...devices] or { device } is required');

      return devices instanceof Array ? this.postAlertDevices(alert, { assign: devices }) : this.postAlertDevice(alert, devices);
    }
  }, {
    key: 'assignDeviceGroups',
    value: function assignDeviceGroups(alert, deviceGroups) {
      if (!deviceGroups) return this.printError('assign', 'deviceGroups', 'Array[...deviceGroups] or { deviceGroup } is required');

      return deviceGroups instanceof Array ? this.postAlertDeviceGroups(alert, { assign: deviceGroups }) : this.postAlertDeviceGroup(alert, deviceGroups);
    }
  }, {
    key: 'assignEmailGroups',
    value: function assignEmailGroups(alert, emailGroups) {
      if (!emailGroups) return this.printError('assign', 'emailGroups', 'Array[...emailGroups] or { emailGroup } is required');

      return emailGroups instanceof Array ? this.postAlertEmailGroups(alert, { assign: emailGroups }) : this.postAlertEmailGroup(alert, emailGroups);
    }
  }, {
    key: 'assignExclusionIntervals',
    value: function assignExclusionIntervals(alert, exclusionIntervals) {
      if (!exclusionIntervals) return this.printError('assign', 'exclusionIntervals', 'Array[...exclusionIntervals] or { exclusionInterval } is required');

      return exclusionIntervals instanceof Array ? this.postAlertExclusionIntervals(alert, { assign: exclusionIntervals }) : this.postAlertExclusionInterval(alert, exclusionIntervals);
    }
  }, {
    key: 'assignNetworks',
    value: function assignNetworks(alert, networks) {
      if (!networks) return this.printError('assign', 'networks', 'Array[...networks] or { network } is required');

      return networks instanceof Array ? this.postAlertNetworks(alert, { assign: networks }) : this.postAlertNetwork(alert, networks);
    }
  }, {
    key: 'unassignApplications',
    value: function unassignApplications(alert, applications) {
      if (!applications) return this.printError('unassign', 'applications', 'Array[...applications] or { application } is required');

      return applications instanceof Array ? this.postAlertApplications(alert, { unassign: applications }) : this.deleteAlertApplication(alert, applications);
    }
  }, {
    key: 'unassignDevices',
    value: function unassignDevices(alert, devices) {
      if (!devices) return this.printError('unassign', 'devices', 'Array[...devices] or { device } is required');

      return devices instanceof Array ? this.postAlertDevices(alert, { unassign: devices }) : this.deleteAlertDevice(alert, devices);
    }
  }, {
    key: 'unassignDeviceGroups',
    value: function unassignDeviceGroups(alert, deviceGroups) {
      if (!deviceGroups) return this.printError('unassign', 'deviceGroups', 'Array[...deviceGroups] or { deviceGroup } is required');

      return deviceGroups instanceof Array ? this.postAlertDeviceGroups(alert, { unassign: deviceGroups }) : this.deleteAlertDeviceGroup(alert, deviceGroups);
    }
  }, {
    key: 'unassignEmailGroups',
    value: function unassignEmailGroups(alert, emailGroups) {
      if (!emailGroups) return this.printError('unassign', 'emailGroups', 'Array[...emailGroups] or { emailGroup } is required');

      return emailGroups instanceof Array ? this.postAlertEmailGroups(alert, { unassign: emailGroups }) : this.deleteAlertEmailGroup(alert, emailGroups);
    }
  }, {
    key: 'unassignExclusionIntervals',
    value: function unassignExclusionIntervals(alert, exclusionIntervals) {
      if (!exclusionIntervals) return this.printError('unassign', 'exclusionIntervals', 'Array[...exclusionIntervals] or { exclusionInterval } is required');

      return exclusionIntervals instanceof Array ? this.postAlertExclusionIntervals(alert, { unassign: exclusionIntervals }) : this.deleteAlertExclusionInterval(alert, exclusionIntervals);
    }
  }, {
    key: 'unassignNetworks',
    value: function unassignNetworks(alert, networks) {
      if (!networks) return this.printError('unassign', 'networks', 'Array[...networks] or { network } is required');

      return networks instanceof Array ? this.postAlertNetworks(alert, { unassign: networks }) : this.deleteAlertNetwork(alert, networks);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getAlerts',
    value: function getAlerts() {
      return this.process(this.appliance.getAlerts(), 'alerts​');
    }
  }, {
    key: 'getAlert',
    value: function getAlert(alert) {
      return this.process(this.appliance.getAlert(alert.id), 'alert');
    }
  }, {
    key: 'postAlert',
    value: function postAlert(alert) {
      return this.process(this.appliance.postAlert(alert), 'alert');
    }
  }, {
    key: 'deleteAlert',
    value: function deleteAlert(alert) {
      return this.process(this.appliance.deleteAlert(alert.id), 'alert');
    }
  }, {
    key: 'patchAlert',
    value: function patchAlert(alert, data) {
      return this.process(this.appliance.patchAlert(alert.id, data), 'alert');
    }

    // -------------------------------------
    // Application Functions
    // -------------------------------------

  }, {
    key: 'getAlertApplications',
    value: function getAlertApplications(alert) {
      return this.process(this.appliance.getAlertApplications(alert.id), 'alert applications');
    }
  }, {
    key: 'postAlertApplications',
    value: function postAlertApplications(alert) {
      var assign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var unassign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      return this.process(this.appliance.postAlertApplications(alert.id, { assign: assign, unassign: unassign }), 'alert applications​');
    }
  }, {
    key: 'postAlertApplication',
    value: function postAlertApplication(alert, application) {
      return this.process(this.appliance.postAlertApplication(alert.id, application.id), 'alert application');
    }
  }, {
    key: 'deleteAlertApplication',
    value: function deleteAlertApplication(alert, application) {
      return this.process(this.appliance.deleteAlertApplication(alert.id, application.id), 'alert application');
    }

    // -------------------------------------
    // Device Functions
    // -------------------------------------

  }, {
    key: 'getAlertDevices',
    value: function getAlertDevices(alert) {
      return this.process(this.appliance.getAlertDevices(alert.id), 'alert devices');
    }
  }, {
    key: 'postAlertDevices',
    value: function postAlertDevices(alert) {
      var assign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var unassign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      return this.process(this.appliance.postAlertDevices(alert.id, { assign: assign, unassign: unassign }), 'alert devices');
    }
  }, {
    key: 'postAlertDevice',
    value: function postAlertDevice(alert, device) {
      return this.process(this.appliance.postAlertDevice(alert.id, device.id), 'alert device');
    }
  }, {
    key: 'deleteAlertDevice',
    value: function deleteAlertDevice(alert, device) {
      return this.process(this.appliance.deleteAlertApplications(alert.id, device.id), 'alert device');
    }

    // -------------------------------------
    // DeviceGroup Functions
    // -------------------------------------

  }, {
    key: 'getAlertDeviceGroups',
    value: function getAlertDeviceGroups(alert) {
      return this.process(this.appliance.getAlertDeviceGroups(alert.id), 'alert device groups');
    }
  }, {
    key: 'postAlertDeviceGroups',
    value: function postAlertDeviceGroups(alert) {
      var assign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var unassign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      return this.process(this.appliance.postAlertDeviceGroups(alert.id, { assign: assign, unassign: unassign }), 'alert device groups');
    }
  }, {
    key: 'postAlertDeviceGroup',
    value: function postAlertDeviceGroup(alert, deviceGroup) {
      return this.process(this.appliance.postAlertDeviceGroup(alert.id, deviceGroup.id), 'alert device group');
    }
  }, {
    key: 'deleteAlertDeviceGroup',
    value: function deleteAlertDeviceGroup(alert, deviceGroup) {
      return this.process(this.appliance.deleteAlertDeviceGroup(alert.id, deviceGroup.id), 'alert device group');
    }

    // -------------------------------------
    // EmailGroup Functions
    // -------------------------------------

  }, {
    key: 'getAlertEmailGroups',
    value: function getAlertEmailGroups(alert) {
      return this.process(this.appliance.getAlertEmailGroups(alert.id), 'alert email groups');
    }
  }, {
    key: 'postAlertEmailGroups',
    value: function postAlertEmailGroups(alert) {
      var assign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var unassign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      return this.process(this.appliance.postAlertEmailGroups(alert.id, { assign: assign, unassign: unassign }), 'alert email groups');
    }
  }, {
    key: 'postAlertEmailGroup',
    value: function postAlertEmailGroup(alert, emailGroup) {
      return this.process(this.appliance.postAlertEmailGroup(alert.id, emailGroup.id), 'alert email group');
    }
  }, {
    key: 'deleteAlertEmailGroup',
    value: function deleteAlertEmailGroup(alert, emailGroup) {
      return this.process(this.appliance.deleteAlertApplications(alert.id, emailGroup.id), 'alert email group');
    }

    // -------------------------------------
    // ExclusionInterval Functions
    // -------------------------------------

  }, {
    key: 'getAlertExclusionIntervals',
    value: function getAlertExclusionIntervals(alert) {
      return this.process(this.appliance.getAlertExclusionIntervals(alert.id), 'alert exclusion intervals');
    }
  }, {
    key: 'postAlertExclusionIntervals',
    value: function postAlertExclusionIntervals(alert) {
      var assign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var unassign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      return this.process(this.appliance.postAlertExclusionIntervals(alert.id, { assign: assign, unassign: unassign }), 'alert exclusion intervals');
    }
  }, {
    key: 'postAlertExclusionInterval',
    value: function postAlertExclusionInterval(alert, exclusionInterval) {
      return this.process(this.appliance.postAlertExclusionInterval(alert.id, exclusionInterval.id), 'alert exclusion interval');
    }
  }, {
    key: 'deleteAlertExclusionInterval',
    value: function deleteAlertExclusionInterval(alert, exclusionInterval) {
      return this.process(this.appliance.deleteAlertApplications(alert.id, exclusionInterval.id), 'alert exclusion interval');
    }

    // -------------------------------------
    // Network Functions
    // -------------------------------------

  }, {
    key: 'getAlertNetworks',
    value: function getAlertNetworks(alert) {
      return this.process(this.appliance.getAlertNetwork(alert.id), 'alert networks');
    }
  }, {
    key: 'postAlertNetworks',
    value: function postAlertNetworks(alert) {
      var assign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var unassign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      return this.process(this.appliance.postAlertNetworks(alert.id, { assign: assign, unassign: unassign }), 'alert networks');
    }
  }, {
    key: 'postAlertNetwork',
    value: function postAlertNetwork(alert, network) {
      return this.process(this.appliance.postAlertNetwork(alert.id, network.id), 'alert network');
    }
  }, {
    key: 'deleteAlertNetwork',
    value: function deleteAlertNetwork(alert, network) {
      return this.process(this.appliance.deleteAlertApplications(alert.id, network.id), 'alert network');
    }

    // -------------------------------------
    // Stat Functions
    // -------------------------------------

  }, {
    key: 'getAlertStats',
    value: function getAlertStats(alert) {
      return this.process(this.appliance.getAlertStats(alert.id), 'alert stats');
    }
  }]);

  return AlertCtrl;
}(BaseCtrl);
//# sourceMappingURL=Alert.controller.js.map