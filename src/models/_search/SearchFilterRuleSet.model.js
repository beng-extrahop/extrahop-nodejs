// SearchFilterRuleSet.model.js

const SearchFilterRule = require('../../models/_search/SearchFilterRule.model');

module.exports = class SearchFilterRuleSet {
  constructor(rules = []) {
    rules.forEach(rule => this.push(new SearchFilterRule(rule)));
  }
}
