// AuditLog.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const AuditLogSet = require('../models/auditLog/AuditLogSet.model');

module.exports = class AuditLogCtrl extends BaseCtrl {

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(params) {
    return new AuditLogSet(...this.getAuditLog(params));
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getAuditLog(params = {}) {
    return this.process(this.appliance.getAuditLog(params), 'audit logs');
  }
};
