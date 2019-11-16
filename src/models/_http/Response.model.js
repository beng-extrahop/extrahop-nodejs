// Response.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Response extends BaseObject {
  constructor(response = {}) {
    super();
    this.url = response.url;
    this.headers = response.headers;
    this.status = response.statusCode || 0;
    this.success = !!(this.status > 0 && this.status < 400);
    this.data = response.data;
    this.error = response.error;
  }
}
