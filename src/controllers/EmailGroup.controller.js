// EmailGroup.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const EmailGroup = require('../models/emailGroup/EmailGroup.model');
const EmailGroupSet = require('../models/emailGroup/EmailGroupSet.model');

const OBJECT_NAME = 'email group';

module.exports = class EmailGroupCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
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
  // Defaults
  // -------------------------------------

  getEmailGroups(params) {
    return this.process(this.appliance.getEmailGroups(params), OBJECT_NAME);
  }

  getEmailGroup(emailGroup) {
    return this.process(this.appliance.getEmailGroup(emailGroup.id), OBJECT_NAME);
  }

  postEmailGroup(emailGroup) {
    return this.process(this.appliance.postEmailGroup(emailGroup), OBJECT_NAME);
  }

  patchEmailGroup(emailGroup, data) {
    return this.process(this.appliance.patchEmailGroup(emailGroup.id, data), OBJECT_NAME);
  }

  deleteEmailGroup(emailGroup) {
    return this.process(this.appliance.deleteEmailGroup(emailGroup.id), OBJECT_NAME);
  }
};
