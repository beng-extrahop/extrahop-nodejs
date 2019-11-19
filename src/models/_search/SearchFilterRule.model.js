// SearchFilterRule.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class SearchFilterRule extends BaseObject {
  constructor(rule = {}) {
    super();

    rule = rule instanceof Array ? { field: rule[0], operator: rule[1], operand: rule[2] } : rule;
    const { field, operator, operand, value } = rule;
    const useAsOperand = operand || value || '';

    this.field = field;
    this.operator = operator;
    this.operand = useAsOperand.includes('~') ? { is_regex: true, value: useAsOperand } : useAsOperand;
  }
};
