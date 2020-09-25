// Apikey.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Apikey = require('../models/apikey/Apikey.model');
const ApikeySet = require('../models/apikey/ApikeySet.model');

const OBJECT_NAME = 'api key';

module.exports = class ApikeyCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(apikey) {
    return apikey ? new Apikey(this.getApikey(apikey)) : new ApikeySet(this.getApikeys());
  }

  set(password) {
    return this.postApikey(password);
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getApikeys() {
    return this.process(this.appliance.getApikeys(), OBJECT_NAME);
  }

  getApikey(apikey) {
    return this.process(this.appliance.getApikey(apikey.id), OBJECT_NAME);
  }

  postApikey(password) {
    return this.process(this.appliance.postApikey({ password }), OBJECT_NAME);
  }
};
