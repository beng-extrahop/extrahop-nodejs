// ApplicationActivity.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class ApplicationActivity extends BaseObject {
  constructor(applicationActivity = {}) {
    super(applicationActivity);
    /* TODO */
    Object.keys(applicationActivity).forEach(key => this[key] = applicationActivity[key]);
  }
}
