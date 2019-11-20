'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// SearchFilter.model.js

var SearchFilterRuleSet = require('../../models/_search/SearchFilterRuleSet.model');

module.exports = function SearchFilter() {
  var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, SearchFilter);

  this.operator = searchFilter.operator;
  this.rules = new (Function.prototype.bind.apply(SearchFilterRuleSet, [null].concat(_toConsumableArray(searchFilter.rules))))();
};
//# sourceMappingURL=SearchFilter.model.js.map