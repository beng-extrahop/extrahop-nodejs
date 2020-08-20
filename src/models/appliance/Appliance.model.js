// Appliance.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Appliance extends BaseObject {
  constructor(appliance = {}) {
    super();
    Object.keys(appliance).forEach((key) => this[key] = appliance[key]);
  }
};
