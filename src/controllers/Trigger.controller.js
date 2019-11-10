// Trigger.controller.js

const Trigger = require('../models/triggers/Trigger.model')
const Strings = require('../constants/String.constants');

module.exports = class TriggerCtrl {
	constructor(appliance) {
		this.appliance = appliance;
	}

  // -------------------------------------
  // Get Triggers
  // -------------------------------------

	findAll() {
		return this.find(null);
	}

	findByAuthor(author, filter = 'equals') {
		return this.find({'author': author}, Strings.Filters.indexOf(filter));
	}

	findById(id, filter = 'equals') {
		return this.find({'id': id}, Strings.Filters.indexOf(filter));
	}

	findByName(name, filter = 'equals') {
		return this.find({'name': name}, Strings.Filters.indexOf(filter));
	}

	findByOwner(username, filter = 'equals') {
		return this.find({'owner': username}, Strings.Filters.indexOf(filter));
	}

	findByType(type, filter = 'equals') {
		return this.find({'type': type}, Strings.Filters.indexOf(filter));
	}

	findBy(property, filter = 'equals') {
		return this.find(property, Strings.Filters.indexOf(filter));
	}

	find(criteria, filter) {
		let triggers = this.appliance.getTriggers().data;

		if ( !triggers || triggers.length == 0 ) {
			console.log(`No triggers found on ${this.appliance.hostname}...`);
			return [];
		}
		else if ( !criteria || criteria === null ) {
			console.log(`Retrieving all triggers from ${this.appliance.hostname}...`);
			return triggers.map(trigger => new Trigger(trigger));
		}

		const [ key, value ] = [ Object.keys(criteria)[0], Object.values(criteria)[0] ];
		console.log(`\nRetrieving triggers where '${key}' ${Search.Filters[filter]} '${value}'`);

		const isMatch = function(trigger, key, value, filter) {
			switch (filter) {
				case 0:
					return !!trigger[key] && trigger[key] == value;
				case 1:
					return !!trigger[key] && trigger[key].includes(value);
				case 2:
					return !!trigger[key] && trigger[key].startsWith(value);
				case 3:
					return !!trigger[key] && trigger[key].endsWith(value);
				default:
					return false;
			}
		}

		let results = [];

		triggers.forEach(function(trigger) {
			if ( isMatch(trigger, key, value, filter) ) {
				results.push(new Trigger(trigger));
			}
		});

		console.log(`Found ${results.length} triggers. Processing updates...\n`);
		return results;
	}

  // -------------------------------------
  // Edit Trigger
  // -------------------------------------

	enable(trigger, skip = true) {
		if ( trigger.disabled || !skip ) {
			trigger.disabled = false;
			return this.patchTrigger(trigger, { 'disabled': trigger.disabled });
		}
	}

	disable(trigger, skip = true) {
		if ( !trigger.disabled || !skip ) {
			trigger.disabled = true;
			return this.patchTrigger(trigger, { 'disabled': trigger.disabled });
		}
	}

	toggle(trigger) {
		return this.patchTrigger(trigger, { 'disabled': !trigger.disabled });
	}

  // -------------------------------------
  // API Functions
  // -------------------------------------

	patchTrigger(trigger, payload) {
		return this.appliance.patchTrigger(trigger.id, payload);
	}
}
