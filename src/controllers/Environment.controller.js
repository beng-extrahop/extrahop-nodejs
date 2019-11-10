// Environment.controller.js

module.exports = class EnvironmentCtrl {
	constructor(environment) {
		this.environment = environment;
	}

	get(platform) {
		return this.appliances.filter(appliance => appliance.platform === (platform || appliance.platform));
	}

	getAll(platform = []) {
		return this.get(platform);
	}

	getECA(platform = 'ecm') {
		return this.get(platform);
	}

	getEDAs(platform = 'extrahop') {
		return this.get(platform);
	}

	getEXAs(platform = 'exa') {
		return this.get(platform);
	}

	getETAs(platform = 'eta') {
		return this.get(platform);
	}
}
