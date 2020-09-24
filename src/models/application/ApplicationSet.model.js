// ApplicationSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Application = require('./Application.model');

module.exports = class ApplicationSet extends BaseObjectSet {
  constructor(applications = []) {
    super(Array.from(applications).map((application) => new Application(application)));
  }
};
