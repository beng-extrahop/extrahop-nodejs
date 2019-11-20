'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Alert.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(Alert, _BaseObject);

  function Alert() {
    var alert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Alert);

    var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this));

    _this.id = alert.id;
    _this.description = alert.description;
    _this.mod_time = alert.mod_time;
    _this.notify_snmp = alert.notify_snmp;
    _this.field_op = alert.field_op;
    _this.stat_name = alert.stat_name;
    _this.disabled = alert.disabled;
    _this.operator = alert.operator;
    _this.operand = alert.operand;
    _this.field_name = alert.field_name;
    _this.field_name2 = alert.field_name2;
    _this.name = alert.name;
    _this.cc = alert.cc;
    _this.apply_all = alert.apply_all;
    _this.serverity = alert.severity;
    _this.author = alert.author;
    _this.param = alert.param;
    _this.param2 = alert.param2;
    _this.interval_length = alert.interval_length;
    _this.units = alert.units;
    _this.refire_interval = alert.refire_interval;
    _this.type = alert.type;
    return _this;
  }

  return Alert;
}(BaseObject);
//# sourceMappingURL=Alert.model.js.map