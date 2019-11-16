// TriggerSet.model.js

const BaseObjectSet = require('../../models/_base/BaseObjectSet.model');
const Trigger = require('../../models/trigger/Trigger.model');

module.exports = class TriggerSet extends BaseObjectSet {
  constructor(...triggers) {
    super(triggers);
    triggers.forEach(trigger => this.push(new Trigger(trigger)));
  }

  writeToCSV({ filename = `triggers-${this.generateId()}.csv`, subkey }) {
    super.writeToCSV({ filename, subkey });
  }
}
