// AcitivtyMapQuery.model.js

const BaseObject = require('../_base/BaseObject.model');

module.exports = class AcitivtyMapQuery extends BaseObject {
  constructor(activityMapQuery = {}) {
    super();
    Object.keys(activityMapQuery).forEach((key) => this[key] = activityMapQuery[key]);
  }
};
