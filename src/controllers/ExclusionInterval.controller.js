// ExclusionInterval.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const ExclusionInterval = require('../models/exclusionInterval/ExclusionInterval.model');
const ExclusionIntervalSet = require('../models/exclusionInterval/ExclusionIntervalSet.model');

module.exports = class ExclusionIntervalCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(params = {}) {
    return new ExclusionIntervalSet(this.getExclusionIntervals(params));
  }

  create(data) {
    return this.postExclusionInterval(new ExclusionInterval(data));
  }

  update(exclusionInterval, data) {
    return this.patchExclusionInterval(exclusionInterval, data);
  }

  delete(exclusionInterval) {
    return this.deleteExclusionInterval(exclusionInterval);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getExclusionIntervals(params) {
    return this.process(this.appliance.getExclusionIntervals(params), 'exclusion intervals');
  }

  getExclusionInterval(exclusionInterval) {
    return this.process(this.appliance.getExclusionInterval(exclusionInterval.id), 'exclusion interval');
  }

  postExclusionInterval(exclusionInterval) {
    return this.process(this.appliance.postExclusionInterval(exclusionInterval), 'exclusion interval');
  }

  patchExclusionInterval(exclusionInterval, data) {
    return this.process(this.appliance.patchExclusionInterval(exclusionInterval.id, data), `exclusionInterval (id: ${exclusionInterval.id})`);
  }

  deleteExclusionInterval(exclusionInterval) {
    return this.process(this.appliance.deleteExclusionInterval(exclusionInterval.id), `exclusionInterval (id: ${exclusionInterval.id})`);
  }
};
