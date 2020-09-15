// AuthSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Auth = require('./Auth.model');

module.exports = class AuthSet extends BaseObjectSet {
  constructor(auths = []) {
    super();
    auths.forEach((auth) => this.push(new Auth(auth)));
  }
};
