// Application.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Application extends BaseObject {
  constructor(application = {}) {
    super();
    /* TODO */
    Object.keys(application).forEach(key => this[key] = application[key]);
  }
}
