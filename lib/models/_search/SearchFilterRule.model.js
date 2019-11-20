'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// SearchFilterRule.model.js

module.exports = function SearchFilterRule(rule) {
  _classCallCheck(this, SearchFilterRule);

  if (rule instanceof Array) {
    var _rule = _slicedToArray(rule, 3),
        field = _rule[0],
        operator = _rule[1],
        _rule$ = _rule[2],
        value = _rule$ === undefined ? '' : _rule$;

    this.field = field;
    this.operator = operator;
    this.operand = value.includes('~') ? { is_regex: true, value: value } : value;
  } else {
    var _field = rule.field,
        _operator = rule.operator,
        operand = rule.operand,
        _value = rule.value;

    var useAsOperand = _value || operand || '';

    this.field = _field;
    this.operator = _operator;
    this.operand = _operator.includes('~') ? { is_regex: true, value: useAsOperand } : useAsOperand;
  }
};
//# sourceMappingURL=SearchFilterRule.model.js.map