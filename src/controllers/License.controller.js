// License.controller.js

const License = require('../models/License.model');

module.exports = class LicenseCtrl {
	constructor(appliance) {
		this.appliance = appliance;
	}

	get() {
		const license = this.appliance.getLicense();

		if ( license.status === 200 && license.data ) {
			return new License(license.data);
		}
	}
}
