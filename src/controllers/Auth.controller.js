// Auth.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Auth = require('../models/auth/Auth.model');
const AuthSet = require('../models/auth/AuthSet.model');
const AuthSaml = require('../models/auth/AuthSaml.model');

const OBJECT_NAME = 'auth';

module.exports = class AuthCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(auth) {
    return auth ? new Auth(this.getAuth(auth)) : new AuthSet(this.getAuths());
  }

  create(data) {
    return this.postAuth(this.build(data));
  }

  update(auth, data) {
    return this.patchAuth(auth, data);
  }

  delete(auth) {
    return this.deleteAuth(auth);
  }

  getPrivileges(auth) {
    return this.getAuthPrivileges(auth);
  }

  updatePrivileges(auth, data) {
    return this.patchAuthPrivileges(auth, data);
  }

  getSaml() {
    return new AuthSaml(this.getAuthSaml());
  }baseObjects

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getAuths() {
    return this.process(this.appliance.getAuths(), OBJECT_NAME);
  }

  getAuth(auth) {
    return this.process(this.appliance.getAuth(auth.id), OBJECT_NAME);
  }

  patchAuth(auth, data) {
    return this.process(this.appliance.patchAuth(auth, data), OBJECT_NAME);
  }

  postAuth(auth) {
    return this.process(this.appliance.postAuth(auth), OBJECT_NAME);
  }

  deleteAuth(id) {
    return this.process(this.appliance.deleteAuth(id), OBJECT_NAME);
  }

  getAuthPrivileges(auth) {
    return this.process(this.appliance.getAuthPrivileges(auth.id), `${OBJECT_NAME} privilege`);
  }

  patchAuthPrivileges(auth, data) {
    return this.process(this.appliance.patchAuthPrivileges(auth, data), `${OBJECT_NAME} privilege`);
  }

  getAuthSaml() {
    return this.process(this.appliance.getAuthSamlSP(), `${OBJECT_NAME} SAML service provider`);
  }
};
