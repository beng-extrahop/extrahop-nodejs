// Response.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Response extends BaseObject {

  constructor({ response, data, error }) {
    super();
    this.headers = response.headers;
    this.status = response.statusCode || 0;
    this.success = (this.status + '').startsWith('2');
    this.data = data || [];
    this.error = error;
  }
}
