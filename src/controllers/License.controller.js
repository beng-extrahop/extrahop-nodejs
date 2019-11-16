// License.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const License = require('../models/license/License.model');

module.exports = class LicenseCtrl extends BaseCtrl {

	constructor(appliance) {
		super(appliance);
	}

  get() {
    return new License(this.getLicense())
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getLicense() {
    return this.process(this.appliance.getLicense(), 'license');
  }
}
