// Response.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Response extends BaseObject {

  constructor({ request, data, error }) {
    super();
    this.headers = request.headers;
    this.status = request.statusCode;
    this.success = (this.status + '').startsWith('2');
    this.data = data;
    this.error = error;
  }
}
