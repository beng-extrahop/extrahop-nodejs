// AnalysisPriority.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class AnalysisPriority extends BaseObject {
  constructor(analysisPriority = {}) {
    super();
    Object.keys(analysisPriority).forEach((key) => this[key] = analysisPriority[key]);
  }
};
