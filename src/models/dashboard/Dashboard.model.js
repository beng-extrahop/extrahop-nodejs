// Dashboard.dashboard.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Dashboard extends BaseObject {
  constructor(dashboard = {}) {
    super(dashboard);
    this.id = dashboard.id;
    this.comment = dashboard.comment;
    this.mod_time = dashboard.mod_time;
    this.author = dashboard.author;
    this.name = dashboard.name;
    this.owner = dashboard.owner;
    this.type = dashboard.type;
    this.short_code = dashboard.short_code;
    this.rights = dashboard.rights;
  }
};
