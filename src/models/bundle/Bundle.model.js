// Bundle.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Bundle extends BaseObject {
  constructor(bundle = {}) {
    super(bundle);
    this.id = bundle.id;
    this.built_in = bundle.built_in;
    this.created_time = bundle.created_time;
    this.description = bundle.description;
    this.mod_time = bundle.mod_time;
    this.name = bundle.name;
  }
}
