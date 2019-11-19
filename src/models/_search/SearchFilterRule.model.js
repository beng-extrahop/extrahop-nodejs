// SearchFilterRule.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class SearchFilterRule extends BaseObject {
  constructor(rule = {}) {
    super();

    if ( rule instanceof Array ) {
      this.field = rule[0];
      this.operator = rule[1];
      this.operand = (rule[2] || '').includes('~') ? { is_regex: true, value: rule[2] } : rule[2];
    }
    else {
      const operandCheck = rule.operand || rule.value || '';
      this.field = rule.field;
      this.operator = rule.operator;
      this.operand = operandCheck.includes('~') ? { is_regex: true, value: operandCheck } : operandCheck;
    }
  }
};
