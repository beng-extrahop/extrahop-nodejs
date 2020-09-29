// Response.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Response extends BaseObject {
  constructor(response = {}) {
    super();
    this.url = response.url;
    this.method = response.method;
    this.headers = response.headers;
    this.status = response.statusCode || 0;
    this.success = (this.status < 400 && this.status > 0);
    this.data = response.body;
    this.message = this.success ? undefined : `[HTTP ${this.status}] ${response.body.split('.\n')[0]}`;
  }
};
