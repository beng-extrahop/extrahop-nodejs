// Trigger.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class Trigger extends BaseObject {
  constructor(trigger = {}) {
    super(trigger);
    this.mod_time = trigger.mod_time;
    this.id = trigger.id;
    this.name = trigger.name;
    this.description = trigger.description;
    this.author = trigger.author;
    this.script = trigger.script;
    this.event = trigger.event;
    this.events = trigger.events;
    this.disabled = trigger.disabled;
    this.debug = trigger.debug;
    this.apply_all = trigger.apply_all;
    this.hints = trigger.hints;
  }
}
