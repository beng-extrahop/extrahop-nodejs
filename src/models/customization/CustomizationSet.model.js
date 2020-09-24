// CustomizationSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Customization = require('./Customization.model');

module.exports = class CustomizationSet extends BaseObjectSet {
  constructor(customizations = []) {
    super(Array.from(customizations).map((customization) => new Customization(customization)));
  }
};
