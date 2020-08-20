// Apikey.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Apikey extends BaseObject {
  constructor(apikey = {}) {
    super();
    Object.keys(apikey).forEach((key) => this[key] = apikey[key]);
  }
};
