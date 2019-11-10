// SearchFilter.model.js

const BaseObject = require('../../models/base/BaseObject.model');
const SearchFilterRuleSet = require('../../models/search/SearchFilterRuleSet.model');

module.exports = class SearchFilter extends BaseObject {
  constructor(searchFilter = {}) {
    super(searchFilter);
    this.operator = searchFilter.operator;
    this.rules = new SearchFilterRuleSet(searchFilter.rules);
  }
}
