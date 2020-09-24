// License.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const License = require('../models/license/License.model');

module.exports = class LicenseCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get() {
    return new License(this.getLicense());
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getLicense() {
    return this.process(this.appliance.getLicense(), 'license');
  }
};
