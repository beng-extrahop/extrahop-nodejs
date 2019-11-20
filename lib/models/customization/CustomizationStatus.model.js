'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CustomizationStatus.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(CustomizationStatus, _BaseObject);

  function CustomizationStatus() {
    var customizationStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CustomizationStatus);

    var _this = _possibleConstructorReturn(this, (CustomizationStatus.__proto__ || Object.getPrototypeOf(CustomizationStatus)).call(this, customizationStatus));

    _this.did_last_succeed = customizationStatus.did_last_succeed;
    _this.last_attempt_time = customizationStatus.last_attempt_time;
    _this.last_success_time = customizationStatus.last_success_time;
    return _this;
  }

  return CustomizationStatus;
}(BaseObject);
//# sourceMappingURL=CustomizationStatus.model.js.map