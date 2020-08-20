// SearchFilterRuleSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const SearchFilterRule = require('./SearchFilterRule.model');

module.exports = class SearchFilterRuleSet extends BaseObjectSet {
  constructor(rules = []) {
    super();
    rules.forEach((rule) => this.push(new SearchFilterRule(rule)));
  }
};
