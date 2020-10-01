// Response.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Response extends BaseObject {
  constructor(response = {}) {
    super();
    Object.keys(response).forEach((key) => this[key] = response[key]);
  }
};
