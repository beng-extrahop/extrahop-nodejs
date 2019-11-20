'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// AnalysisPriority.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var AnalysisPriority = require('../models/analysisPriority/AnalysisPriority.model');
var AnalysisPriorityManager = require('../models/analysisPriority/AnalysisPriorityManager.model');

module.exports = function (_BaseCtrl) {
  _inherits(AnalysisPriorityCtrl, _BaseCtrl);

  function AnalysisPriorityCtrl() {
    _classCallCheck(this, AnalysisPriorityCtrl);

    return _possibleConstructorReturn(this, (AnalysisPriorityCtrl.__proto__ || Object.getPrototypeOf(AnalysisPriorityCtrl)).apply(this, arguments));
  }

  _createClass(AnalysisPriorityCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get() {
      var appliance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { id: 0 };

      return new AnalysisPriority(this.getAnalysisPriority(appliance));
    }
  }, {
    key: 'getManager',
    value: function getManager() {
      return new AnalysisPriorityManager(this.getAnalysisPriorityManager());
    }
  }, {
    key: 'update',
    value: function update(appliance, data) {
      return this.putAnalysisPriority(appliance, this.build(data));
    }
  }, {
    key: 'updateManager',
    value: function updateManager(appliance) {
      return this.patchAnalysisPriorityManager(appliance);
    }
  }, {
    key: 'build',
    value: function build(data) {
      return new AnalysisPriority(data);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getAnalysisPriority',
    value: function getAnalysisPriority(appliance) {
      return this.process(this.appliance.getAnalysisPriority(appliance.id), 'analysis priority');
    }
  }, {
    key: 'putAnalysisPriority',
    value: function putAnalysisPriority(appliance, analysisPriority) {
      return this.process(this.appliance.putAnalysisPriority(appliance.id, analysisPriority), 'analysis priority');
    }
  }, {
    key: 'getAnalysisPriorityManager',
    value: function getAnalysisPriorityManager(appliance) {
      return this.process(this.appliance.getAnalysisPriorityManager(appliance.id), 'analysis priority manager');
    }
  }, {
    key: 'patchAnalysisPriorityManager',
    value: function patchAnalysisPriorityManager(appliance, manager) {
      return this.process(this.appliance.patchAnalysisPriorityManager(appliance.id, { manager: manager.id }), 'analysis priority manager');
    }
  }]);

  return AnalysisPriorityCtrl;
}(BaseCtrl);
//# sourceMappingURL=AnalysisPriority.controller.js.map