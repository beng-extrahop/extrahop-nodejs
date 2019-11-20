'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Trigger.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var Trigger = require('../models/trigger/Trigger.model');
var TriggerSet = require('../models/trigger/TriggerSet.model');
var Strings = require('../constants/Global.constants');

module.exports = function (_BaseCtrl) {
  _inherits(TriggerCtrl, _BaseCtrl);

  function TriggerCtrl() {
    _classCallCheck(this, TriggerCtrl);

    return _possibleConstructorReturn(this, (TriggerCtrl.__proto__ || Object.getPrototypeOf(TriggerCtrl)).apply(this, arguments));
  }

  _createClass(TriggerCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(trigger) {
      return trigger ? new Trigger(this.getTrigger(trigger)) : new (Function.prototype.bind.apply(TriggerSet, [null].concat(_toConsumableArray(this.getTriggers()))))();
    }

    // -------------------------------------
    // Get Triggers
    // -------------------------------------

  }, {
    key: 'findAll',
    value: function findAll() {
      return this.find(null);
    }
  }, {
    key: 'findByAuthor',
    value: function findByAuthor(author) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'equals';

      return this.find({ author: author }, Strings.Filters.indexOf(filter));
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'equals';

      return this.find({ id: id }, Strings.Filters.indexOf(filter));
    }
  }, {
    key: 'findByName',
    value: function findByName(name) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'equals';

      return this.find({ name: name }, Strings.Filters.indexOf(filter));
    }
  }, {
    key: 'findByOwner',
    value: function findByOwner(username) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'equals';

      return this.find({ owner: username }, Strings.Filters.indexOf(filter));
    }
  }, {
    key: 'findByType',
    value: function findByType(type) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'equals';

      return this.find({ type: type }, Strings.Filters.indexOf(filter));
    }
  }, {
    key: 'findBy',
    value: function findBy(property) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'equals';

      return this.find(property, Strings.Filters.indexOf(filter));
    }

    // -------------------------------------
    // Edit Trigger
    // -------------------------------------

  }, {
    key: 'enable',
    value: function enable(trigger) {
      var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!trigger.disabled && skip) {
        return null;
      }

      return this.patchTrigger(trigger, { disabled: false });
    }
  }, {
    key: 'disable',
    value: function disable(trigger) {
      var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (trigger.disabled && skip) {
        return null;
      }

      return this.patchTrigger(trigger, { disabled: true });
    }
  }, {
    key: 'toggle',
    value: function toggle(trigger) {
      return this.patchTrigger(trigger, { disabled: !trigger.disabled });
    }

    // -------------------------------------
    // API Functions
    // -------------------------------------

  }, {
    key: 'getTriggers',
    value: function getTriggers() {
      return this.process(this.appliance.getTriggers(), 'triggers');
    }
  }, {
    key: 'getTrigger',
    value: function getTrigger(trigger) {
      return this.process(this.appliance.getTrigger(trigger.id), 'trigger');
    }
  }, {
    key: 'patchTrigger',
    value: function patchTrigger(trigger, payload) {
      return this.appliance.patchTrigger(trigger.id, payload);
    }
  }]);

  return TriggerCtrl;
}(BaseCtrl);
//# sourceMappingURL=Trigger.controller.js.map