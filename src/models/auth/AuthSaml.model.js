// AuthSaml.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class AuthSaml extends BaseObject {
  constructor(authSaml = {}) {
    super();
    Object.keys(authSaml).forEach((key) => this[key] = authSaml[key]);
  }
};
