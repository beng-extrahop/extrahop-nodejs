// EmailGroup.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class EmailGroup extends BaseObject {
  constructor(emailGroup) {
    super();
    this.id = emailGroup.id;
    this.description = emailGroup.description;
    this.name = emailGroup.name;
  }
}
