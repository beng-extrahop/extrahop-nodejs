'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ActivityMap.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(ActivityMap, _BaseObject);

  function ActivityMap() {
    var activityMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ActivityMap);

    var _this = _possibleConstructorReturn(this, (ActivityMap.__proto__ || Object.getPrototypeOf(ActivityMap)).call(this));

    _this.display = activityMap.display;
    _this.name = _this.display;
    _this.oid = activityMap.oid;
    _this.id = _this.oid;
    _this.description = activityMap.description;
    return _this;
  }

  return ActivityMap;
}(BaseObject);
//# sourceMappingURL=ActivityMap.model.js.map