// Auth.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Auth = require('../models/auth/Auth.model');
const AuthSet = require('../models/auth/AuthSet.model');

module.exports = class AuthCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
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

  getSamlSP() {
    return this.getAuthSamlSP();
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getAuths() {
    return this.process(this.appliance.getAuths(), 'auths');
  }

  getAuth(auth) {
    return this.process(this.appliance.getAuth(auth.id), 'auth');
  }

  patchAuth(auth, data) {
    return this.process(this.appliance.patchAuth(auth, data), 'auth');
  }

  postAuth(auth) {
    return this.process(this.appliance.postAuth(auth), 'auth');
  }

  deleteAuth(id) {
    return this.process(this.appliance.deleteAuth(id), 'auth');
  }

  getAuthPrivileges(auth) {
    return this.process(this.appliance.getAuthPrivileges(auth.id), 'auth privileges');
  }

  patchAuthPrivileges(auth, data) {
    return this.process(this.appliance.patchAuthPrivileges(auth, data), 'auth privileges');
  }

  getAuthSamlSP() {
    return this.process(this.appliance.getAuthSamlSP(), 'auth SAML service provider');
  }
};
