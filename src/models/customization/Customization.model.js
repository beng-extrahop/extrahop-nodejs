// Customization.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Customization extends BaseObject {
  constructor(customization = {}) {
    super(customization);
    this.id = customization.id;
    this.auto = customization.auto;
    this.create_time = customization.create_time;
    this.name = customization.name;
    this.recovered = customization.recovered;
  }
};
