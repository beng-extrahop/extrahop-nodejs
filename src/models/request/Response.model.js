// Request.model.js

var BaseObject = require('../../models/base/BaseObject.model');

module.exports = class Response extends BaseObject {
  constructor({ request, response, errors }) {
    super();
    this.headers = request.headers;
    this.status = request.statusCode || 0;
    this.success = (this.status + '').startsWith('2');
    this.data = response || [];
    this.errors = errors;
  }
}
