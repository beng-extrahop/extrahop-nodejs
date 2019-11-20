'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// DeviceGroup.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(DeviceGroup, _BaseObject);

  function DeviceGroup() {
    var deviceGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DeviceGroup);

    var _this = _possibleConstructorReturn(this, (DeviceGroup.__proto__ || Object.getPrototypeOf(DeviceGroup)).call(this, deviceGroup));

    _this.mod_time = deviceGroup.mod_time;
    _this.description = deviceGroup.description;
    _this.id = deviceGroup.id;
    _this.name = deviceGroup.name;
    _this.include_custom_devices = deviceGroup.include_custom_devices;
    _this.dynamic = deviceGroup.dynamic;
    _this.field = deviceGroup.field;
    _this.value = deviceGroup.value;
    return _this;
  }

  return DeviceGroup;
}(BaseObject);
//# sourceMappingURL=DeviceGroup.model.js.map