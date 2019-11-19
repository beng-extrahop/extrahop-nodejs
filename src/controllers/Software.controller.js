// Software.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Software = require('../models/software/Software.model');
const SoftwareSet = require('../models/software/SoftwareSet.model');

module.exports = class SoftwareCtrl extends BaseCtrl {

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(software) {
    return software ? new Software(this.getSoftware(software)) : new SoftwareSet(...this.getSoftwares());
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getSoftwares() {
    return this.process(this.appliance.getSoftwares(), 'software');
  }

  getSoftware(software) {
    return this.process(this.appliance.getSoftware(software.id), 'software');
  }
};
