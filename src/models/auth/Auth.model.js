// Auth.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Auth extends BaseObject {
  constructor(auth = {}) {
    super();
    Object.keys(auth).forEach((key) => this[key] = auth[key]);
  }
};
