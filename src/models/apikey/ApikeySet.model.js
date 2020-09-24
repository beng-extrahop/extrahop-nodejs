// ApikeySet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Apikey = require('./Apikey.model');

module.exports = class ApikeySet extends BaseObjectSet {
  constructor(apikeys = []) {
    super(Array.from(apikeys).map((apikey) => new Apikey(apikey)));
  }
};
