// Application.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class Application extends BaseObject {
  constructor(application = {}) {
    super();
    Object.keys(application).forEach((key) => this[key] = application[key]);
  }
};
