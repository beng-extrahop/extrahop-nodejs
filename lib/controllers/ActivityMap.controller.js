'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ActivityMap.controller.js

var BaseCtrl = require('../controllers/_base/BaseCtrl.controller');
var ActivityMap = require('../models/activityMap/ActivityMap.model');
var ActivityMapSet = require('../models/activityMap/ActivityMapSet.model');
var ActivityMapQuery = require('../models/activityMap/ActivityMapQuery.model');
var ActivityMapSharing = require('../models/activityMap/ActivityMapSharing.model');

module.exports = function (_BaseCtrl) {
  _inherits(ActivityMapCtrl, _BaseCtrl);

  function ActivityMapCtrl() {
    _classCallCheck(this, ActivityMapCtrl);

    return _possibleConstructorReturn(this, (ActivityMapCtrl.__proto__ || Object.getPrototypeOf(ActivityMapCtrl)).apply(this, arguments));
  }

  _createClass(ActivityMapCtrl, [{
    key: 'get',


    // -------------------------------------
    // Defaults
    // -------------------------------------

    value: function get(activityMap) {
      return activityMap ? new ActivityMap(this.getActivityMap(activityMap)) : new (Function.prototype.bind.apply(ActivityMapSet, [null].concat(_toConsumableArray(this.getActivityMaps()))))();
    }
  }, {
    key: 'getSharing',
    value: function getSharing(activityMap) {
      return new ActivityMapSharing(this.getActivityMapSharing(activityMap));
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.postActivityMap(this.build(data));
    }
  }, {
    key: 'query',
    value: function query(data, activityMap) {
      return activityMap ? this.postActivityMapQuery(new ActivityMapQuery(data), activityMap) : this.postActivityMapsQuery(new ActivityMapQuery(data));
    }
  }, {
    key: 'update',
    value: function update(activityMap, data) {
      return this.patchActivityMap(activityMap, data);
    }
  }, {
    key: 'delete',
    value: function _delete(activityMap) {
      return this.deleteActivityMap(activityMap);
    }
  }, {
    key: 'build',
    value: function build(data) {
      return new ActivityMap(data);
    }

    // -------------------------------------
    // Base Functions
    // -------------------------------------

  }, {
    key: 'getActivityMaps',
    value: function getActivityMaps() {
      return this.process(this.appliance.getActivityMaps(), 'activity maps');
    }
  }, {
    key: 'getActivityMap',
    value: function getActivityMap(activityMap) {
      return this.process(this.appliance.getActivityMap(activityMap.id), 'activity map');
    }
  }, {
    key: 'postActivityMap',
    value: function postActivityMap(activityMap) {
      return this.process(this.appliance.postActivityMap(activityMap), 'activity map');
    }
  }, {
    key: 'deleteActivityMap',
    value: function deleteActivityMap(activityMap) {
      return this.process(this.appliance.deleteActivityMap(activityMap.id), 'activity map');
    }
  }, {
    key: 'patchActivityMap',
    value: function patchActivityMap(activityMap, data) {
      return this.process(this.appliance.patchActivityMap(activityMap.id, data), 'activity map');
    }

    // -------------------------------------
    // Query Functions
    // -------------------------------------

  }, {
    key: 'postActivityMapsQuery',
    value: function postActivityMapsQuery(query) {
      return this.process(this.appliance.postActivityMapsQuery(query), 'activity maps query');
    }
  }, {
    key: 'postActivityMapQuery',
    value: function postActivityMapQuery(activityMap, query) {
      return this.process(this.appliance.postActivityMapQuery(activityMap.id, query), 'activity map query');
    }

    // -------------------------------------
    // Sharing Functions
    // -------------------------------------

  }, {
    key: 'getActivityMapSharing',
    value: function getActivityMapSharing(activityMap) {
      return new ActivityMapSharing(this.process(this.appliance.getActivityMapSharing(activityMap.id), 'activity map'));
    }
  }, {
    key: 'patchActivityMapSharing',
    value: function patchActivityMapSharing(activityMap, sharing) {
      return this.process(this.appliance.patchActivityMapSharing(activityMap.id, sharing), 'activity map sharing');
    }
  }, {
    key: 'putActivityMapSharing',
    value: function putActivityMapSharing(activityMap, sharing) {
      return this.process(this.appliance.putActivityMapSharing(activityMap.id, sharing), 'activity map sharing');
    }
  }]);

  return ActivityMapCtrl;
}(BaseCtrl);
//# sourceMappingURL=ActivityMap.controller.js.map