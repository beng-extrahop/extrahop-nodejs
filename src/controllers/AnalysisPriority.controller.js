// AnalysisPriority.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const AnalysisPriority = require('../models/analysisPriority/AnalysisPriority.model');
const AnalysisPriorityManager = require('../models/analysisPriority/AnalysisPriorityManager.model');

const OBJECT_NAME = 'analysis priority';

module.exports = class AnalysisPriorityCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(appliance) {
    return new AnalysisPriority(this.getAnalysisPriority(appliance));
  }

  getManager(appliance) {
    return new AnalysisPriorityManager(this.getAnalysisPriorityManager(appliance));
  }

  update(appliance, data) {
    return this.putAnalysisPriority(appliance, this.build(data));
  }

  updateManager(appliance) {
    return this.patchAnalysisPriorityManager(appliance);
  }

  build(data) {
    return new AnalysisPriority(data);
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getAnalysisPriority(appliance) {
    return this.process(this.appliance.getAnalysisPriority(appliance.id), OBJECT_NAME);
  }

  putAnalysisPriority(appliance, analysisPriority) {
    return this.process(this.appliance.putAnalysisPriority(appliance.id, analysisPriority), OBJECT_NAME);
  }

  getAnalysisPriorityManager(appliance) {
    return this.process(this.appliance.getAnalysisPriorityManager(appliance.id), `${OBJECT_NAME} manager`);
  }

  patchAnalysisPriorityManager(appliance, manager) {
    return this.process(
      this.appliance.patchAnalysisPriorityManager(appliance.id, { manager: manager.id }), `${OBJECT_NAME} manager`,
    );
  }
};
