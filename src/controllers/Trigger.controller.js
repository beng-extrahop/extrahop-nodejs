// Trigger.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Trigger = require('../models/trigger/Trigger.model');
const TriggerSet = require('../models/trigger/TriggerSet.model');
const Strings = require('../constants/Global.constants');

module.exports = class TriggerCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
  // -------------------------------------

  get(trigger) {
    return trigger ? new Trigger(this.getTrigger(trigger)) : new TriggerSet(this.getTriggers());
  }

  delete(trigger) {
    return this.deleteTrigger(trigger);
  }

  // -------------------------------------
  // Get Triggers
  // -------------------------------------

  findAll() {
    return this.find(null);
  }

  findByAuthor(author, filter = 'equals') {
    return this.find({ author }, Strings.Filters.indexOf(filter));
  }

  findById(id, filter = 'equals') {
    return this.find({ id }, Strings.Filters.indexOf(filter));
  }

  findByName(name, filter = 'equals') {
    return this.find({ name }, Strings.Filters.indexOf(filter));
  }

  findByOwner(username, filter = 'equals') {
    return this.find({ owner: username }, Strings.Filters.indexOf(filter));
  }

  findByType(type, filter = 'equals') {
    return this.find({ type }, Strings.Filters.indexOf(filter));
  }

  findBy(property, filter = 'equals') {
    return this.find(property, Strings.Filters.indexOf(filter));
  }

  // -------------------------------------
  // Edit Trigger
  // -------------------------------------

  enable(trigger, skip = true) {
    if (!trigger.disabled && skip) {
      return null;
    }

    return this.patchTrigger(trigger, { disabled: false });
  }

  disable(trigger, skip = true) {
    if (trigger.disabled && skip) {
      return null;
    }

    return this.patchTrigger(trigger, { disabled: true });
  }

  toggle(trigger) {
    return this.patchTrigger(trigger, { disabled: !trigger.disabled });
  }

  // -------------------------------------
  // Base Functions
  // -------------------------------------

  getTriggers() {
    return this.process(this.appliance.getTriggers(), 'triggers');
  }

  getTrigger(trigger) {
    return this.process(this.appliance.getTrigger(trigger.id), 'trigger');
  }

  patchTrigger(trigger, payload) {
    return this.process(this.appliance.patchTrigger(trigger.id, payload), 'trigger');
  }

  postTrigger(payload) {
    return this.process(this.appliance.postTrigger(payload), 'trigger');
  }

  deleteTrigger(trigger) {
    return this.process(this.appliance.deleteTrigger(trigger.id), 'trigger');
  }
};
