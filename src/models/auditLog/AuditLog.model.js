// AuditLog.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class AuditLog extends BaseObject {
  constructor(auditLog = {}) {
    super();
    Object.keys(auditLog).forEach((key) => this[key] = auditLog[key]);
  }
};
