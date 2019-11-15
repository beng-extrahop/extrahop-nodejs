// AuditLog.controller.js

const BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
const AuditLog = require('../models/auditLog/AuditLog.model');
const AuditLogSet = require('../models/auditLog/AuditLogSet.model');

module.exports = class AuditLogCtrl extends BaseCtrl {
	constructor(appliance) {
		super(appliance);
	}

  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(params) {
    return new AuditLogSet(this.getAuditLogs(params));
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getAuditLogs(params = {}) {
    return this.process(this.appliance.getAuditLogs(params), 'audit log');
  }

}
