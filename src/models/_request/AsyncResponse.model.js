// Request.model.js

module.exports = class Response {
  constructor(response) {
    this.headers = response.headers;
    this.status = response.status;
    this.success = (this.status + '').startsWith('2');
    this.data = response.data;
    this.errors = response.errors;
  }

  doSomething() {
  }
}
