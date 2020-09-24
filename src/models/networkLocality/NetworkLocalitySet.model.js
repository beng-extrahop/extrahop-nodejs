// NetworkLocalitySet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const NetworkLocality = require('./NetworkLocality.model');

module.exports = class NetworkLocalitySet extends BaseObjectSet {
  constructor(networkLocalities = []) {
    super(Array.from(networkLocalities).map((networkLocality) => new NetworkLocality(networkLocality)));
  }
};
