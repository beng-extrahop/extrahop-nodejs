'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// License.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var License = require('../models/license/License.model');

module.exports = function (_BaseCtrl) {
  _inherits(LicenseCtrl, _BaseCtrl);

  function LicenseCtrl() {
    _classCallCheck(this, LicenseCtrl);

    return _possibleConstructorReturn(this, (LicenseCtrl.__proto__ || Object.getPrototypeOf(LicenseCtrl)).apply(this, arguments));
  }

  _createClass(LicenseCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get() {
      return new License(this.getLicense());
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getLicense',
    value: function getLicense() {
      return this.process(this.appliance.getLicense(), 'license');
    }
  }]);

  return LicenseCtrl;
}(BaseCtrl);
//# sourceMappingURL=License.controller.js.map