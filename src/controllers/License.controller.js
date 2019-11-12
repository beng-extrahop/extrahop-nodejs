// License.controller.js

const License = require('../models/license/License.model');

module.exports = class LicenseCtrl {
	constructor(appliance) {
		this.appliance = appliance;
    this.license = this.getLicense();

    return new License(this.license);
	}

  getLicense() {
    return this.appliance.getLicense().data || {};
  }
}
