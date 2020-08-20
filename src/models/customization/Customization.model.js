// Customization.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Customization extends BaseObject {
  constructor(customization = {}) {
    super();
    Object.keys(customization).forEach((key) => this[key] = customization[key]);
  }
};
