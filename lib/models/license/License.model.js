'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// License.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(License, _BaseObject);

  function License() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, License);

    var _this = _possibleConstructorReturn(this, (License.__proto__ || Object.getPrototypeOf(License)).call(this));

    _this.dossier = config.dossier;
    _this.serial = config.serial;
    _this.product_key = config.product_key;
    _this.platform = config.platform;
    _this.expires_at = config.expires_at;
    _this.expires_in = config.expires_in;
    _this.options = config.options;
    _this.modules = config.modules;
    return _this;
  }

  return License;
}(BaseObject);
//# sourceMappingURL=License.model.js.map