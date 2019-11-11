// SearchFilter.model.js

const SearchFilterRuleSet = require('../../models/_search/SearchFilterRuleSet.model');

module.exports = class SearchFilter {
  constructor(searchFilter = {}) {
    this.operator = searchFilter.operator;
    this.rules = new SearchFilterRuleSet(searchFilter.rules);
  }
}
