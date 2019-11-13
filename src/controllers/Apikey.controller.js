// Apikey.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const Apikey = require('../models/apikey/Apikey.model');
const ApikeySet = require('../models/apikey/ApikeySet.model');

module.exports = class ApikeyCtrl extends BaseCtrl {
	constructor(appliance) {
		super(appliance);
	}

  get(apikey) {
    return apikey ? new Apikey(this.getApikey(apikey)) : new ApikeySet(this.getApikeys());
  }

  post(password) {
    return this.postApikey(password);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getApikeys() {
    return this.process(this.appliance.getApikeys(), 'API key');
  }

  getApikey(apikey) {
    return this.process(this.appliance.getApikey(apikey.id), 'API key');
  }

  postApikey(password) {
    return this.process(this.appliance.postApikey({ password }), 'API key');
  }
}