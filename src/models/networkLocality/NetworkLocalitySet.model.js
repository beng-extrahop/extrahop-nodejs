// NetworkLocalitySet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const NetworkLocality = require('./NetworkLocality.model');

module.exports = class NetworkLocalitySet extends BaseObjectSet {
  constructor(networkLocalities = []) {
    super();
    networkLocalities.forEach((networkLocality) => this.push(new NetworkLocality(networkLocality)));
  }

  writeToCSV({ filename = `networkLocalities-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
