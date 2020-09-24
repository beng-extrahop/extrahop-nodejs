// EmailGroup.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const EmailGroup = require('../models/emailGroup/EmailGroup.model');
const EmailGroupSet = require('../models/emailGroup/EmailGroupSet.model');

module.exports = class EmailGroupCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(params = {}) {
    return new EmailGroupSet(this.getEmailGroups(params));
  }

  create(data) {
    return this.postEmailGroup(new EmailGroup(data));
  }

  update(emailGroup, data) {
    return this.patchEmailGroup(emailGroup, data);
  }

  delete(emailGroup) {
    return this.deleteEmailGroup(emailGroup);
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getEmailGroups(params) {
    return this.process(this.appliance.getEmailGroups(params), 'email groups');
  }

  getEmailGroup(emailGroup) {
    return this.process(this.appliance.getEmailGroup(emailGroup.id), 'email group');
  }

  postEmailGroup(emailGroup) {
    return this.process(this.appliance.postEmailGroup(emailGroup), 'email group');
  }

  patchEmailGroup(emailGroup, data) {
    return this.process(this.appliance.patchEmailGroup(emailGroup.id, data), `email group (id: ${emailGroup.id})`);
  }

  deleteEmailGroup(emailGroup) {
    return this.process(this.appliance.deleteEmailGroup(emailGroup.id), `email group (id: ${emailGroup.id})`);
  }
};
