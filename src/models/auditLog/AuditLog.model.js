// Apikey.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Apikey extends BaseObject {
  constructor(apikey = {}) {
    super(apikey);
    this.description = apikey.description;
    this.id = apikey.id;
    this.key = apikey.key;
    this.time_added = apikey.time_added;
    this.user_id = apikey.user_id;
    this.username = apikey.username;
  }
}
