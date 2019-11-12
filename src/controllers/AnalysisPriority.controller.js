// AnalysisPriority.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const AnalysisPriority = require('../models/activityGroup/AnalysisPriority.model');

module.exports = class AnalysisPriorityCtrl extends BaseCtrl {
  constructor(appliance) {
    super(appliance);
  }

  get() {
    return new AnalysisPriority(this.getAnalysisPriority());
  }

  getManager() {
    return this.getAnalysisPriorityManager();
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
    return this.process(this.appliance.putAnalysisPriority(appliance.id, analysisPriority), 'analysis priority');
  }

  getAnalysisPriorityManager(appliance) {
    return this.process(this.appliance.getAnalysisPriorityManager(appliance.id), 'analysis priority manager');
  }

  patchAnalysisPriorityManager(appliance) {
    return this.process(this.appliance.patchAnalysisPriorityManager({ manager: appliance.id }), 'analysis priority manager');
  }
}
