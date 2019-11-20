'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// SearchFilterRuleSet.model.js

var BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
var SearchFilterRule = require('../../models/_search/SearchFilterRule.model');

module.exports = function (_BaseObjectSet) {
  _inherits(SearchFilterRuleSet, _BaseObjectSet);

  function SearchFilterRuleSet() {
    var _ref;

    _classCallCheck(this, SearchFilterRuleSet);

    for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
      rules[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = SearchFilterRuleSet.__proto__ || Object.getPrototypeOf(SearchFilterRuleSet)).call.apply(_ref, [this].concat(_toConsumableArray(rules.map(function (rule) {
      return new SearchFilterRule(rule);
    })))));
  }

  return SearchFilterRuleSet;
}(BaseObjectSet);
//# sourceMappingURL=SearchFilterRuleSet.model.js.map