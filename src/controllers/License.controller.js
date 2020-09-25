// License.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const License = require('../models/license/License.model');

const OBJECT_NAME = 'license';

module.exports = class LicenseCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get() {
    return new License(this.getLicense());
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getLicense() {
    return this.process(this.appliance.getLicense(), OBJECT_NAME);
  }
};
