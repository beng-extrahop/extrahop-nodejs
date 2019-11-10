// License.model.js

const BaseObject = require('../../models/base/BaseObject.model');

module.exports = class License extends BaseObject {
  constructor(config = {}) {
    super();
		this.dossier = config.dossier;
		this.serial = config.serial;
		this.product_key = config.product_key;
		this.platform = config.platform;
		this.expires_at = config.expires_at;
		this.expires_in = config.expires_in;
		this.options = config.options;
		this.modules = config.modules;
  }
}
