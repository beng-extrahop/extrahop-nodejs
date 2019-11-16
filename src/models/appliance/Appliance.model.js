// Appliance.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Appliance extends BaseObject {
  constructor(appliance = {}) {
    super();
    /* TODO */
    Object.keys(appliance).forEach(key => this[key] = appliance[key]);
  }
}
