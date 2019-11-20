'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CustomDevice.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(CustomDevice, _BaseObject);

  function CustomDevice() {
    var customDevice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CustomDevice);

    var _this = _possibleConstructorReturn(this, (CustomDevice.__proto__ || Object.getPrototypeOf(CustomDevice)).call(this, customDevice));

    _this.id = customDevice.id;
    _this.author = customDevice.author;
    _this.mod_time = customDevice.mod_time;
    _this.description = customDevice.description;
    _this.extrahop_id = customDevice.extrahop_id;
    _this.name = customDevice.name;
    _this.disabled = customDevice.disabled;
    return _this;
  }

  return CustomDevice;
}(BaseObject);
//# sourceMappingURL=CustomDevice.model.js.map