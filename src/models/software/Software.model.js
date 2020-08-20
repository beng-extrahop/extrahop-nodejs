// Software.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Software extends BaseObject {
  constructor(software = {}) {
    super();
    Object.keys(software).forEach((key) => this[key] = software[key]);
  }
};
