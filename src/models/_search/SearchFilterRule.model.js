// SearchFilterRule.model.js

module.exports = class SearchFilterRule {
  constructor(rule = {}) {
    rule = rule instanceof Array ? { field: rule[0], operator: rule[1], operand: rule[2] } : rule;
    const { field, operator, operand } = rule;

    this.field = field;
    this.operator = operator;
    this.operand = (operator || '').includes('~') ? { is_regex: true, value: operand } : operand;
  }
}
