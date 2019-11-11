// Request.model.js

module.exports = class Response {
  constructor({ request, response, errors }) {
    this.headers = request.headers;
    this.status = request.statusCode || 0;
    this.success = (this.status + '').startsWith('2');
    this.data = response || [];
    this.errors = errors;
  }
}
