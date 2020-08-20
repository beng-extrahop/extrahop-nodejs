// Trigger.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Trigger extends BaseObject {
  constructor(trigger = {}) {
    super();
    Object.keys(trigger).forEach((key) => this[key] = trigger[key]);
  }
};
