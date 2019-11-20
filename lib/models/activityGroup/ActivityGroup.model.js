'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ActivityGroup.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(ActivityGroup, _BaseObject);

  function ActivityGroup() {
    var activityGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ActivityGroup);

    var _this = _possibleConstructorReturn(this, (ActivityGroup.__proto__ || Object.getPrototypeOf(ActivityGroup)).call(this));

    _this.display = activityGroup.display;
    _this.name = _this.display;
    _this.oid = activityGroup.oid;
    _this.id = _this.oid;
    _this.description = activityGroup.description;
    return _this;
  }

  return ActivityGroup;
}(BaseObject);
//# sourceMappingURL=ActivityGroup.model.js.map