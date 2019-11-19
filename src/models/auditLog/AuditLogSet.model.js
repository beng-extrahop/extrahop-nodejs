// AuditLogSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const AuditLog = require('../../models/auditLog/AuditLog.model');

module.exports = class AuditLogSet extends BaseObjectSet {
  constructor(...auditLogs) {
    super(...auditLogs.map(auditLog => new AuditLog(auditLog)));
  }

  writeToCSV({ filename = `auditLogs-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
