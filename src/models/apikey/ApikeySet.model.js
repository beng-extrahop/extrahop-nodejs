// ApikeySet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Apikey = require('../../models/apikey/Apikey.model');

module.exports = class ApikeySet extends BaseObjectSet {
  constructor(apikeys = []) {
    super(apikeys);
    apikeys.forEach(apikey => this.push(new Apikey(apikey)));
  }

  writeToCSV({ filename = `apikeys-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}
