'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// AnalysisPriority.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(AnalysisPriority, _BaseObject);

  function AnalysisPriority() {
    var analysisPriority = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AnalysisPriority);

    var _this = _possibleConstructorReturn(this, (AnalysisPriority.__proto__ || Object.getPrototypeOf(AnalysisPriority)).call(this));

    _this.advanced_rules = analysisPriority.advanced_rules;
    _this.autofill_advanced = analysisPriority.autofill_advanced;
    _this.autofill_standard = analysisPriority.autofill_standard;
    _this.standard_rules = analysisPriority.standard_rules;
    return _this;
  }

  return AnalysisPriority;
}(BaseObject);
//# sourceMappingURL=AnalysisPriority.model.js.map