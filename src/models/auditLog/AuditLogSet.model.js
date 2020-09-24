// AuditLogSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const AuditLog = require('./AuditLog.model');

module.exports = class AuditLogSet extends BaseObjectSet {
  constructor(auditLogs = []) {
    super(Array.from(auditLogs).map((auditLog) => new AuditLog(auditLog)));
  }
};
