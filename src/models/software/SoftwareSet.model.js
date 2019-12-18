// SoftwareSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Software = require('../../models/software/Software.model');

module.exports = class SoftwareSet extends BaseObjectSet {
  constructor(softwares = []) {
    super();
    softwares.forEach(software => this.push(new Software(software)));
  }

  writeToCSV({ filename = `softwares-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
