'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Customization.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Customization = require('../models/customization/Customization.model');
var CustomizationSet = require('../models/customization/CustomizationSet.model');
var CustomizationStatus = require('../models/customization/CustomizationStatus.model');

module.exports = function (_BaseCtrl) {
  _inherits(CustomizationCtrl, _BaseCtrl);

  function CustomizationCtrl() {
    _classCallCheck(this, CustomizationCtrl);

    return _possibleConstructorReturn(this, (CustomizationCtrl.__proto__ || Object.getPrototypeOf(CustomizationCtrl)).apply(this, arguments));
  }

  _createClass(CustomizationCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(customization) {
      return customization ? new Customization(this.getCustomization(customization)) : new (Function.prototype.bind.apply(CustomizationSet, [null].concat(_toConsumableArray(this.getCustomizations()))))();
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return new CustomizationStatus(this.getCustomizationStatus());
    }
  }, {
    key: 'delete',
    value: function _delete(customization) {
      return this.deleteCustomization(customization);
    }
  }, {
    key: 'backup',
    value: function backup(name) {
      return this.postCustomization(name);
    }
  }, {
    key: 'restore',
    value: function restore(customization) {
      return this.postCustomizationApply(customization);
    }
  }, {
    key: 'save',
    value: function save(customization) {
      return this.postCustomizationDownload(customization);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getCustomizations',
    value: function getCustomizations() {
      return this.process(this.appliance.getCustomizations(), 'customizations');
    }
  }, {
    key: 'getCustomization',
    value: function getCustomization(customization) {
      return this.process(this.appliance.getCustomization(customization.id), 'customization');
    }
  }, {
    key: 'postCustomization',
    value: function postCustomization(name) {
      return this.process(this.appliance.postCustomization({ name: name }), 'customization');
    }
  }, {
    key: 'deleteCustomization',
    value: function deleteCustomization(customization) {
      return this.process(this.appliance.deleteCustomization(customization.id), 'customization');
    }

    // -------------------------------------
    // Status Functions
    // -------------------------------------

  }, {
    key: 'getCustomizationStatus',
    value: function getCustomizationStatus() {
      return this.process(this.appliance.getCustomizationStatus(), 'customization status');
    }

    // -------------------------------------
    // Apply Functions
    // -------------------------------------

  }, {
    key: 'postCustomizationApply',
    value: function postCustomizationApply(customization) {
      return this.process(this.appliance.postCustomizationApply(customization.id), 'customization apply');
    }

    // -------------------------------------
    // Download Functions
    // -------------------------------------

  }, {
    key: 'postCustomizationDownload',
    value: function postCustomizationDownload(customization) {
      return this.process(this.appliance.postCustomizationDownload(customization.id), 'customization download');
    }
  }]);

  return CustomizationCtrl;
}(BaseCtrl);
//# sourceMappingURL=Customization.controller.js.map