// AuditLogSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const AuditLog = require('./AuditLog.model');

module.exports = class AuditLogSet extends BaseObjectSet {
  constructor(auditLogs = []) {
    super();
    auditLogs.forEach((auditLog) => this.push(new AuditLog(auditLog)));
  }

  writeToCSV({ filename = `auditLogs-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
