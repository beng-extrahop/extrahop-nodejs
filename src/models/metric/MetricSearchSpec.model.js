// MetricSearchSpec.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class MetricSearchSpec extends BaseObject {
  constructor({ calc_type, key1, key2, name, percentiles }) {
    super();
    this.calc_type = calc_type;
    this.key1 = key1;
    this.key2 = key2;
    this.name = name;
    this.percentiles = percentiles;
  }
}
