// AnalysisPriority.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const AnalysisPriority = require('../models/analysisPriority/AnalysisPriority.model');
const AnalysisPriorityManager = require('../models/analysisPriority/AnalysisPriorityManager.model');

module.exports = class AnalysisPriorityCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(appliance = { id: 0 }) {
    return new AnalysisPriority(this.getAnalysisPriority(appliance));
  }

  getManager() {
    return new AnalysisPriorityManager(this.getAnalysisPriorityManager());
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
  // Base Functions
  // -------------------------------------

  getAnalysisPriority(appliance) {
    return this.process(this.appliance.getAnalysisPriority(appliance.id), 'analysis priority');
  }

  putAnalysisPriority(appliance, analysisPriority) {
    return this.process(
      this.appliance.putAnalysisPriority(appliance.id, analysisPriority),
      'analysis priority'
    );
  }

  getAnalysisPriorityManager(appliance) {
    return this.process(this.appliance.getAnalysisPriorityManager(appliance.id), 'analysis priority manager');
  }

  patchAnalysisPriorityManager(appliance, manager) {
    return this.process(
      this.appliance.patchAnalysisPriorityManager(appliance.id, { manager: manager.id }),
      'analysis priority manager'
    );
  }
};
