// CustomizationStatus.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class CustomizationStatus extends BaseObject {
  constructor(customizationStatus = {}) {
    super();
    Object.keys(customizationStatus).forEach((key) => this[key] = customizationStatus[key]);
  }
};
