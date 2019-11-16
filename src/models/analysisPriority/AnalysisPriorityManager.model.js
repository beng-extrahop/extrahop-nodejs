// AnalysisPriorityManager.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class AnalysisPriorityManager extends BaseObject {

  constructor(analysisPriorityManager = {}) {
    super();
    this.manager = analysisPriorityManager.manager;
  }

}
