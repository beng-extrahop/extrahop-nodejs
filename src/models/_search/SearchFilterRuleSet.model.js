// SearchFilterRuleSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const SearchFilterRule = require('../../models/_search/SearchFilterRule.model');

module.exports = class SearchFilterRuleSet extends BaseObjectSet {

  constructor(...rules) {
    super(...rules.map(rule => new SearchFilterRule(rule)));
  }

}
