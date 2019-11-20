'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ApplicationActivity.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(ApplicationActivity, _BaseObject);

  function ApplicationActivity() {
    var applicationActivity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ApplicationActivity);

    /* TODO */
    var _this = _possibleConstructorReturn(this, (ApplicationActivity.__proto__ || Object.getPrototypeOf(ApplicationActivity)).call(this, applicationActivity));

    Object.keys(applicationActivity).forEach(function (key) {
      return _this[key] = applicationActivity[key];
    });
    return _this;
  }

  return ApplicationActivity;
}(BaseObject);
//# sourceMappingURL=ApplicationActivity.model.js.map