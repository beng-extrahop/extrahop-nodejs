'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// AuditLog.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var AuditLogSet = require('../models/auditLog/AuditLogSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(AuditLogCtrl, _BaseCtrl);

  function AuditLogCtrl() {
    _classCallCheck(this, AuditLogCtrl);

    return _possibleConstructorReturn(this, (AuditLogCtrl.__proto__ || Object.getPrototypeOf(AuditLogCtrl)).apply(this, arguments));
  }

  _createClass(AuditLogCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(params) {
      return new (Function.prototype.bind.apply(AuditLogSet, [null].concat(_toConsumableArray(this.getAuditLog(params)))))();
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getAuditLog',
    value: function getAuditLog() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.process(this.appliance.getAuditLog(params), 'audit logs');
    }
  }]);

  return AuditLogCtrl;
}(BaseCtrl);
//# sourceMappingURL=AuditLog.controller.js.map