// AuditLog.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class AuditLog extends BaseObject {
  constructor(auditLog = {}) {
    super(auditLog);
    this.id = auditLog.id;
    this.body = auditLog.body;
    this.occur_time = auditLog.occur_time;
    this.time = auditLog.time;
  }
};
