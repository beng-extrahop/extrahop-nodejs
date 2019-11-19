// AcitivtyMapQuery.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class AcitivtyMapQuery extends BaseObject {
  constructor(activityMapQuery = {}) {
    super();
    /* TODO */
    Object.keys(activityMapQuery).forEach(key => (this[key] = activityMapQuery[key]));
  }
};
