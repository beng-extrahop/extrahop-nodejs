// CustomDeviceCriteriaSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const CustomDeviceCriteria = require('./CustomDeviceCriteria.model');

module.exports = class CustomDeviceCriteriaSet extends BaseObjectSet {
  constructor(customDeviceCriterias = []) {
    super(customDeviceCriterias.map((customDeviceCriteria) => new CustomDeviceCriteria(customDeviceCriteria)));
  }
};
