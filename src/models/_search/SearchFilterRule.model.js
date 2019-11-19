// SearchFilterRule.model.js

module.exports = class SearchFilterRule {
  constructor(rule) {
    if ( rule instanceof Array ) {
      const [ field, operator, value = '' ] = rule;

      this.field = field;
      this.operator = operator;
      this.operand = value.includes('~') ? { is_regex: true, value } : value;
    }
    else {
      const { field, operator, operand, value } = rule;
      const useAsOperand = value || operand || '';

      this.field = field;
      this.operator = operator;
      this.operand = operator.includes('~') ? { is_regex: true, value: useAsOperand } : useAsOperand;
    }
  }
};
