// AnalysisPriority.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class AnalysisPriority extends BaseObject {

  constructor(analysisPriority = {}) {
    super();
    this.advanced_rules = analysisPriority.advanced_rules;
    this.autofill_advanced = analysisPriority.autofill_advanced;
    this.autofill_standard = analysisPriority.autofill_standard;
    this.standard_rules = analysisPriority.standard_rules;
  }

}
