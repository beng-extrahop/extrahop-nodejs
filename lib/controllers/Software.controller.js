'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Software.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Software = require('../models/software/Software.model');
var SoftwareSet = require('../models/software/SoftwareSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(SoftwareCtrl, _BaseCtrl);

  function SoftwareCtrl() {
    _classCallCheck(this, SoftwareCtrl);

    return _possibleConstructorReturn(this, (SoftwareCtrl.__proto__ || Object.getPrototypeOf(SoftwareCtrl)).apply(this, arguments));
  }

  _createClass(SoftwareCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(software) {
      return software ? new Software(this.getSoftware(software)) : new (Function.prototype.bind.apply(SoftwareSet, [null].concat(_toConsumableArray(this.getSoftwares()))))();
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getSoftwares',
    value: function getSoftwares() {
      return this.process(this.appliance.getSoftwares(), 'software');
    }
  }, {
    key: 'getSoftware',
    value: function getSoftware(software) {
      return this.process(this.appliance.getSoftware(software.id), 'software');
    }
  }]);

  return SoftwareCtrl;
}(BaseCtrl);
//# sourceMappingURL=Software.controller.js.map