// License.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class License extends BaseObject {
  constructor(license = {}) {
    super();
    Object.keys(license).forEach((key) => this[key] = license[key]);
  }
};
