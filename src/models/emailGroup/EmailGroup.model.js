// EmailGroup.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class EmailGroup extends BaseObject {
  constructor(emailGroup = {}) {
    super();
    Object.keys(emailGroup).forEach((key) => this[key] = emailGroup[key]);
  }
};
