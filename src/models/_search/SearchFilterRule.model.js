// SearchFilterRule.model.js

module.exports = class SearchFilterRule {
  constructor(rule) {
    // Do something
    if (rule instanceof Array) {
      const [field, operator, value = ''] = rule;

      this.field = field;
      this.operator = operator;
      this.operand = value.includes('~') ? { is_regex: true, value } : value;
    }

    // Do something else
    else {
      const useAsOperand = rule.value || rule.operand || '';

      this.field = rule.field;
      this.operator = rule.operator;
      this.operand = rule.operator.includes('~') ? { is_regex: true, value: useAsOperand } : useAsOperand;
    }
  }
};
