'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Apikey.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Apikey = require('../models/apikey/Apikey.model');
var ApikeySet = require('../models/apikey/ApikeySet.model');

module.exports = function (_BaseCtrl) {
  _inherits(ApikeyCtrl, _BaseCtrl);

  function ApikeyCtrl() {
    _classCallCheck(this, ApikeyCtrl);

    return _possibleConstructorReturn(this, (ApikeyCtrl.__proto__ || Object.getPrototypeOf(ApikeyCtrl)).apply(this, arguments));
  }

  _createClass(ApikeyCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(apikey) {
      return apikey ? new Apikey(this.getApikey(apikey)) : new (Function.prototype.bind.apply(ApikeySet, [null].concat(_toConsumableArray(this.getApikeys()))))();
    }
  }, {
    key: 'set',
    value: function set(password) {
      return this.postApikey(password);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getApikeys',
    value: function getApikeys() {
      return this.process(this.appliance.getApikeys(), 'API keys');
    }
  }, {
    key: 'getApikey',
    value: function getApikey(apikey) {
      return this.process(this.appliance.getApikey(apikey.id), 'API key');
    }
  }, {
    key: 'postApikey',
    value: function postApikey(password) {
      return this.process(this.appliance.postApikey({ password: password }), 'API key');
    }
  }]);

  return ApikeyCtrl;
}(BaseCtrl);
//# sourceMappingURL=Apikey.controller.js.map