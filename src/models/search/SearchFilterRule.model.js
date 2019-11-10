// SearchFilterRule.model.js

const BaseObject = require('../../models/base/BaseObject.model');

module.exports = class SearchFilterRule extends BaseObject {
  constructor(filterRule = {}) {
    super(filterRule);

    if ( filterRule instanceof Array ) {
      filterRule = { field: filterRule[0], operator: filterRule[1], operand: filterRule[2] };
    }

    const { field, operator, operand } = filterRule;

    this.field = field;
    this.operator = operator;
    this.operand = operator && operator.includes('~') ? { is_regex: true, value: operand } : operand;
  }
}
