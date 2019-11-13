// ApplicationSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Application = require('../../models/application/Application.model');

module.exports = class ApplicationSet extends BaseObjectSet {
  constructor(applications = []) {
    super(applications);
    applications.forEach(application => this.push(new Application(application)));
  }

  writeToCSV({ filename = `applications-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}