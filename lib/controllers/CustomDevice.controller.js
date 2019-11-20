'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CustomDevice.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var CustomDevice = require('../models/customDevice/CustomDevice.model');
var CustomDeviceSet = require('../models/customDevice/CustomDeviceSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(CustomDeviceCtrl, _BaseCtrl);

  function CustomDeviceCtrl() {
    _classCallCheck(this, CustomDeviceCtrl);

    return _possibleConstructorReturn(this, (CustomDeviceCtrl.__proto__ || Object.getPrototypeOf(CustomDeviceCtrl)).apply(this, arguments));
  }

  _createClass(CustomDeviceCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(customDevice) {
      return customDevice ? new CustomDevice(this.getCustomDevice(customDevice)) : new (Function.prototype.bind.apply(CustomDeviceSet, [null].concat(_toConsumableArray(this.getCustomDevices()))))();
    }
  }, {
    key: 'getCriteria',
    value: function getCriteria(customDevice) {
      return this.getCustomDeviceCriteria(customDevice);
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.postCustomDevice(new CustomDevice(data));
    }
  }, {
    key: 'update',
    value: function update(customDevice, data) {
      return this.patchCustomDevice(customDevice, data);
    }
  }, {
    key: 'delete',
    value: function _delete(customDevice) {
      return this.deleteCustomDevice(customDevice);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getCustomDevices',
    value: function getCustomDevices(params) {
      return this.process(this.appliance.getCustomDevices(params), 'custom devices');
    }
  }, {
    key: 'getCustomDevice',
    value: function getCustomDevice(customDevice, criteria) {
      return this.process(this.appliance.getCustomDevice(customDevice.id, criteria), 'custom device');
    }
  }, {
    key: 'postCustomDevice',
    value: function postCustomDevice(customDevice) {
      return this.process(this.appliance.postCustomDevice(customDevice), 'custom device');
    }
  }, {
    key: 'deleteCustomDevice',
    value: function deleteCustomDevice(id) {
      return this.process(this.appliance.deleteCustomDevice(id), 'custom device');
    }
  }, {
    key: 'patchCustomDevice',
    value: function patchCustomDevice(customDevice, data) {
      return this.process(this.appliance.patchCustomDevice(customDevice.id, data), 'custom device');
    }

    // -------------------------------------
    // Criteria Functions
    // -------------------------------------

  }, {
    key: 'getCustomDeviceCriteria',
    value: function getCustomDeviceCriteria(customDevice) {
      return this.process(this.appliance.getCustomDeviceCriteria(customDevice.id), 'custom device criteria');
    }
  }, {
    key: 'postCustomDeviceCriteria',
    value: function postCustomDeviceCriteria(customDevice, criteria) {
      return this.process(this.appliance.postCustomDeviceCriteria(customDevice.id, criteria), 'custom device criteria');
    }
  }, {
    key: 'deleteCustomDeviceCriteria',
    value: function deleteCustomDeviceCriteria(customDevice, criteria) {
      return this.process(this.appliance.deleteCustomDeviceCriteria(customDevice.id, criteria), 'custom device criteria');
    }
  }]);

  return CustomDeviceCtrl;
}(BaseCtrl);
//# sourceMappingURL=CustomDevice.controller.js.map