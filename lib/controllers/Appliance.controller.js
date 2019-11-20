'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Appliance.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Appliance = require('../models/appliance/Appliance.model');
var ApplianceSet = require('../models/appliance/ApplianceSet.model');
var ApplianceConnection = require('../models/appliance/ApplianceConnection.model');
var ApplianceCloudServices = require('../models/appliance/ApplianceCloudServices.model');
var ApplianceProductKey = require('../models/appliance/ApplianceProductKey.model');

module.exports = function (_BaseCtrl) {
  _inherits(ApplianceCtrl, _BaseCtrl);

  function ApplianceCtrl() {
    _classCallCheck(this, ApplianceCtrl);

    return _possibleConstructorReturn(this, (ApplianceCtrl.__proto__ || Object.getPrototypeOf(ApplianceCtrl)).apply(this, arguments));
  }

  _createClass(ApplianceCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(appliance) {
      return appliance ? new Appliance(this.getAppliance(appliance)) : new (Function.prototype.bind.apply(ApplianceSet, [null].concat(_toConsumableArray(this.getAppliances()))))();
    }
  }, {
    key: 'getCloudServices',
    value: function getCloudServices(appliance) {
      return new ApplianceCloudServices(this.getApplianceCloudServices(appliance));
    }
  }, {
    key: 'getProductKey',
    value: function getProductKey(appliance) {
      return new ApplianceProductKey(this.getProductKey(appliance));
    }
  }, {
    key: 'connect',
    value: function connect(data) {
      return this.postAppliance(this.build(data));
    }
  }, {
    key: 'build',
    value: function build(data) {
      return new ApplianceConnection(data);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getAppliances',
    value: function getAppliances() {
      return this.process(this.appliance.getAppliances(), 'appliances');
    }
  }, {
    key: 'getAppliance',
    value: function getAppliance(appliance) {
      return this.process(this.appliance.getAppliance(appliance.id), 'appliance');
    }
  }, {
    key: 'postAppliance',
    value: function postAppliance(connection) {
      return this.process(this.appliance.postAppliance(connection), 'appliance connection');
    }
  }, {
    key: 'getApplianceCloudServices',
    value: function getApplianceCloudServices(appliance) {
      return this.process(this.appliance.getApplianceCloudServices(appliance.id), 'appliance cloud services');
    }
  }, {
    key: 'getApplianceProductKey',
    value: function getApplianceProductKey(appliance) {
      return this.process(this.appliance.getApplianceProductKey(appliance.id), 'appliance product key');
    }
  }]);

  return ApplianceCtrl;
}(BaseCtrl);
//# sourceMappingURL=Appliance.controller.js.map