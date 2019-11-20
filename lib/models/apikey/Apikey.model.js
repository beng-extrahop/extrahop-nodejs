'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Apikey.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(Apikey, _BaseObject);

  function Apikey() {
    var apikey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Apikey);

    var _this = _possibleConstructorReturn(this, (Apikey.__proto__ || Object.getPrototypeOf(Apikey)).call(this, apikey));

    _this.description = apikey.description;
    _this.id = apikey.id;
    _this.key = apikey.key;
    _this.time_added = apikey.time_added;
    _this.user_id = apikey.user_id;
    _this.username = apikey.username;
    return _this;
  }

  return Apikey;
}(BaseObject);
//# sourceMappingURL=Apikey.model.js.map