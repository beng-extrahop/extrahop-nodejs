// TriggerSet.model.js

const BaseObjectSet = require('../_base/BaseObjectSet.model');
const Trigger = require('./Trigger.model');

module.exports = class TriggerSet extends BaseObjectSet {
  constructor(triggers = []) {
    super(Array.from(triggers).map((trigger) => new Trigger(trigger)));
  }
};
