// ApikeySet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Apikey = require('./Apikey.model');

module.exports = class ApikeySet extends BaseObjectSet {
  constructor(apikeys = []) {
    super();
    apikeys.forEach((apikey) => this.push(new Apikey(apikey)));
  }

  writeToCSV({ filename = `apikeys-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
