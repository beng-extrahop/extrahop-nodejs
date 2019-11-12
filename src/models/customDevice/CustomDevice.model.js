// CustomDevice.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class CustomDevice extends BaseObject {
  constructor(customDevice = {}) {
    super(customDevice);
    this.id = customDevice.id;
    this.author = customDevice.author;
    this.mod_time = customDevice.mod_time;
    this.description = customDevice.description;
    this.extrahop_id = customDevice.extrahop_id;
    this.name = customDevice.name;
    this.disabled = customDevice.disabled;
  }
}
