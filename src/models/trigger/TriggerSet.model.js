// TriggerSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Trigger = require('./Trigger.model');

module.exports = class TriggerSet extends BaseObjectSet {
  constructor(triggers = []) {
    super();
    triggers.forEach((trigger) => this.push(new Trigger(trigger)));
  }

  writeToCSV({ filename = `triggers-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
};
