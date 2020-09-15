// CustomDeviceCriteria.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class CustomDeviceCriteria extends BaseObject {
  constructor(customDeviceCriteria = {}) {
    super();
    Object.keys(customDeviceCriteria).forEach((key) => this[key] = customDeviceCriteria[key]);
  }
};
