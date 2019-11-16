// SearchFilter.model.js

const BaseObject = require('../../models/_base/BaseObject.model');
const SearchFilterRuleSet = require('../../models/_search/SearchFilterRuleSet.model');

module.exports = class SearchFilter extends BaseObject {

  constructor(searchFilter = {}) {
    super();
    this.operator = searchFilter.operator;
    this.rules = new SearchFilterRuleSet(searchFilter.rules);
  }

}
