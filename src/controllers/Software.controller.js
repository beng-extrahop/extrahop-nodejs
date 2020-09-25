// Software.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Software = require('../models/software/Software.model');
const SoftwareSet = require('../models/software/SoftwareSet.model');

const OBJECT_NAME = 'software';

module.exports = class SoftwareCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(software) {
    return software ? new Software(this.getSoftware(software)) : new SoftwareSet(this.getSoftwares());
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getSoftwares() {
    return this.process(this.appliance.getSoftwares(), OBJECT_NAME);
  }

  getSoftware(software) {
    return this.process(this.appliance.getSoftware(software.id), OBJECT_NAME);
  }
};
