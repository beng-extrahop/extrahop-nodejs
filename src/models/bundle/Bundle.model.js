// Bundle.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Bundle extends BaseObject {
  constructor(bundle = {}) {
    super();
    Object.keys(bundle).forEach((key) => this[key] = bundle[key]);
  }
};
