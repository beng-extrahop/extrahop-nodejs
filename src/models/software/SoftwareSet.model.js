// SoftwareSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Software = require('./Software.model');

module.exports = class SoftwareSet extends BaseObjectSet {
  constructor(softwares = []) {
    super(Array.from(softwares).map((software) => new Software(software)));
  }
};
