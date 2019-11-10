// SearchFilterRuleSet.model.js

const BaseObjectSet = require('../../models/base/BaseObjectSet.model');
const SearchFilterRule = require('../../models/search/SearchFilterRule.model');

module.exports = class SearchFilterRuleSet extends BaseObjectSet {
  constructor(searchFilterRules = []) {
    super(searchFilterRules);
    searchFilterRules.forEach(rule => this.push(new SearchFilterRule(rule)));
  }
}
