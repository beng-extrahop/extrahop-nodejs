'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Trigger.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(Trigger, _BaseObject);

  function Trigger() {
    var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Trigger);

    var _this = _possibleConstructorReturn(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this, trigger));

    _this.mod_time = trigger.mod_time;
    _this.id = trigger.id;
    _this.name = trigger.name;
    _this.description = trigger.description;
    _this.author = trigger.author;
    _this.script = trigger.script;
    _this.event = trigger.event;
    _this.events = trigger.events;
    _this.disabled = trigger.disabled;
    _this.debug = trigger.debug;
    _this.apply_all = trigger.apply_all;
    _this.hints = trigger.hints;
    return _this;
  }

  return Trigger;
}(BaseObject);
//# sourceMappingURL=Trigger.model.js.map