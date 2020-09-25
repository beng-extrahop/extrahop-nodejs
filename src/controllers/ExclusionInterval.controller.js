// ExclusionInterval.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const ExclusionInterval = require('../models/exclusionInterval/ExclusionInterval.model');
const ExclusionIntervalSet = require('../models/exclusionInterval/ExclusionIntervalSet.model');

const OBJECT_NAME = 'exclusion interval';

module.exports = class ExclusionIntervalCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
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
  // Defaults
  // -------------------------------------

  getExclusionIntervals(params) {
    return this.process(this.appliance.getExclusionIntervals(params), OBJECT_NAME);
  }

  getExclusionInterval(exclusionInterval) {
    return this.process(this.appliance.getExclusionInterval(exclusionInterval.id), OBJECT_NAME);
  }

  postExclusionInterval(exclusionInterval) {
    return this.process(this.appliance.postExclusionInterval(exclusionInterval), OBJECT_NAME);
  }

  patchExclusionInterval(exclusionInterval, data) {
    return this.process(this.appliance.patchExclusionInterval(exclusionInterval.id, data), OBJECT_NAME);
  }

  deleteExclusionInterval(exclusionInterval) {
    return this.process(this.appliance.deleteExclusionInterval(exclusionInterval.id), OBJECT_NAME);
  }
};
