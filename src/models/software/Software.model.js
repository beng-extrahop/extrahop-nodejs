// Software.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Software extends BaseObject {
  constructor(software = {}) {
    super(software);
    this.id = software.id;
    this.description = software.description;
    this.name = software.name;
    this.software_type = software.software_type;
    this.version = software.version;
  }
};
