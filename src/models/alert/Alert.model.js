// Alert.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Alert extends BaseObject {
  constructor(alert = {}) {
    super();
    this.id = alert.id;
    this.description = alert.description;
    this.mod_time = alert.mod_time;
    this.notify_snmp = alert.notify_snmp;
    this.field_op = alert.field_op;
    this.stat_name = alert.stat_name;
    this.disabled = alert.disabled;
    this.operator = alert.operator;
    this.operand = alert.operand;
    this.field_name = alert.field_name;
    this.field_name2 = alert.field_name2;
    this.name = alert.name;
    this.cc = alert.cc;
    this.apply_all = alert.apply_all;
    this.serverity = alert.severity;
    this.author = alert.author;
    this.param = alert.param;
    this.param2 = alert.param2;
    this.interval_length = alert.interval_length;
    this.units = alert.units;
    this.refire_interval = alert.refire_interval;
    this.type = alert.type;
  }
};
