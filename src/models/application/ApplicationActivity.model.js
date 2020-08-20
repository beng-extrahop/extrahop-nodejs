// ApplicationActivity.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class ApplicationActivity extends BaseObject {
  constructor(applicationActivity = {}) {
    super();
    Object.keys(applicationActivity).forEach((key) => this[key] = applicationActivity[key]);
  }
};
