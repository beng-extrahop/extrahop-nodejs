// AuditLog.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const AuditLogSet = require('../models/auditLog/AuditLogSet.model');

const OBJECT_NAME = 'audit log';

module.exports = class AuditLogCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(params) {
    return new AuditLogSet(this.getAuditLog(params));
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getAuditLog(params = {}) {
    return this.process(this.appliance.getAuditLog(params), OBJECT_NAME);
  }
};
