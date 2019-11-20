'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ActivityGroup.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var ActivityGroupSet = require('../models/activityGroup/ActivityGroupSet.model');
var DashboardSet = require('../models/dashboard/DashboardSet.model');

module.exports = function (_BaseCtrl) {
  _inherits(ActivityGroupCtrl, _BaseCtrl);

  function ActivityGroupCtrl() {
    _classCallCheck(this, ActivityGroupCtrl);

    return _possibleConstructorReturn(this, (ActivityGroupCtrl.__proto__ || Object.getPrototypeOf(ActivityGroupCtrl)).apply(this, arguments));
  }

  _createClass(ActivityGroupCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get() {
      return new (Function.prototype.bind.apply(ActivityGroupSet, [null].concat(_toConsumableArray(this.getActivityGroups()))))();
    }
  }, {
    key: 'getDashboards',
    value: function getDashboards(activityGroup) {
      return new (Function.prototype.bind.apply(DashboardSet, [null].concat(_toConsumableArray(this.getActivityGroupDashboards(activityGroup)))))();
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getActivityGroups',
    value: function getActivityGroups() {
      return this.process(this.appliance.getActivityGroups(), 'activity groups');
    }
  }, {
    key: 'getActivityGroupDashboards',
    value: function getActivityGroupDashboards(activityGroup) {
      return this.process(this.appliance.getActivityGroupDashboards(activityGroup.id), 'activity group dashboards');
    }
  }]);

  return ActivityGroupCtrl;
}(BaseCtrl);
//# sourceMappingURL=ActivityGroup.controller.js.map