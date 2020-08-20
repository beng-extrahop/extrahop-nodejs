// AnalysisPriorityManager.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class AnalysisPriorityManager extends BaseObject {
  constructor(analysisPriorityManager = {}) {
    super();
    Object.keys(analysisPriorityManager).forEach((key) => this[key] = analysisPriorityManager[key]);
  }
};
