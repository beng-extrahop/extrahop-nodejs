'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Appliance.controller.js

var BaseCtrl = require('../../controllers/_base/BaseCtrl.controller');
var ApplianceSet = require('../../models/appliance/ApplianceSet.model');

var _require = require('../../constants/Global.constants'),
    Config = _require.Config,
    Icons = _require.Icons,
    Strings = _require.Strings;

module.exports = function (_BaseCtrl) {
  _inherits(ApplianceCtrl, _BaseCtrl);

  function ApplianceCtrl() {
    _classCallCheck(this, ApplianceCtrl);

    return _possibleConstructorReturn(this, (ApplianceCtrl.__proto__ || Object.getPrototypeOf(ApplianceCtrl)).apply(this, arguments));
  }

  _createClass(ApplianceCtrl, [{
    key: 'init',
    value: function init() {
      try {
        this.appliances = new ApplianceSet(Config.hosts.filter(function (host) {
          return host.enabled;
        })).filter(function (appliance) {
          return appliance.active;
        });

        if (!this.appliances || this.appliances.length === 0) {
          throw new Error();
        }
      } catch (error) {
        console.info(Icons.Error + ' No active hosts available. Exiting.\n');
      }
    }
  }, {
    key: 'getAllHosts',
    value: function getAllHosts() {
      return this.appliances;
    }
  }, {
    key: 'getHostByID',
    value: function getHostByID(id) {
      return this.get({ id: id })[0];
    }
  }, {
    key: 'getHostByHostname',
    value: function getHostByHostname(hostname) {
      return this.get({ hostname: hostname })[0];
    }
  }, {
    key: 'getECA',
    value: function getECA() {
      return this.get({ platform: Strings.Platforms.Command })[0];
    }
  }, {
    key: 'getEDAs',
    value: function getEDAs() {
      return this.get({ platform: Strings.Platforms.Discover });
    }
  }, {
    key: 'getEXAs',
    value: function getEXAs() {
      return this.get({ platform: Strings.Platforms.Explore });
    }
  }, {
    key: 'getETAs',
    value: function getETAs() {
      return this.get({ platform: Strings.Platforms.Trace });
    }
  }]);

  return ApplianceCtrl;
}(BaseCtrl);
//# sourceMappingURL=Appliance.controller.js.map