// ApplicationSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Application = require('./Application.model');

module.exports = class ApplicationSet extends BaseObjectSet {
  constructor(applications = []) {
    super();
    applications.forEach((application) => this.push(new Application(application)));
  }

  writeToCSV({ filename = `applications-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
