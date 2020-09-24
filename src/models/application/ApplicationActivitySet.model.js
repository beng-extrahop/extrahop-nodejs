// ApplicationSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const ApplicationActivity = require('./ApplicationActivity.model');

module.exports = class ApplicationActivitySet extends BaseObjectSet {
  constructor(applicationActivities = []) {
    super(Array.from(applicationActivities).map((applicationActivity) => new ApplicationActivity(applicationActivity)));
  }
};
