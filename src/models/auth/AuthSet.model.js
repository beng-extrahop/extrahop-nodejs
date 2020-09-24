// AuthSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Auth = require('./Auth.model');

module.exports = class AuthSet extends BaseObjectSet {
  constructor(auths = []) {
    super(Array.from(auths).map((auth) => new Auth(auth)));
  }
};
