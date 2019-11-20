'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Environment.model.js

var BaseObject = require('../../models/_base/BaseObject.model');
var Appliance = require('../../models/_app/Appliance.model');
var ApplianceSet = require('../../models/_app/ApplianceSet.model');

var _require = require('../../constants/Global.constants'),
    Icons = _require.Icons,
    Platforms = _require.Platforms;

module.exports = function (_BaseObject) {
  _inherits(Environment, _BaseObject);

  function Environment() {
    var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Environment);

    var _this = _possibleConstructorReturn(this, (Environment.__proto__ || Object.getPrototypeOf(Environment)).call(this));

    _this.name = environment.name;
    _this.appliances = environment.appliances;
    return _this;
  }

  _createClass(Environment, [{
    key: 'get',
    value: function get(_ref) {
      var type = _ref.type,
          platform = _ref.platform,
          hostname = _ref.hostname;

      if (hostname) {
        return new Appliance(this.appliances.find(function (x) {
          return [x.hostname, x.host].includes(hostname);
        }));
      }

      if (type === 'ECA') {
        var ecas = this.appliances.filter(function (x) {
          return x.type === type || x.platform === platform;
        });

        if (ecas.length > 1) {
          console.warn(Icons.Warn + ' Multiple ECAs detected. Using host: ' + ecas[0].hostname);
        }

        return new Appliance(ecas[0]);
      }

      return new (Function.prototype.bind.apply(ApplianceSet, [null].concat(_toConsumableArray(this.appliances.filter(function (x) {
        return x.type === type || x.platform === platform;
      })))))();
    }
  }, {
    key: 'eca',
    value: function eca(hostname) {
      return this.get({ type: 'ECA', platform: Platforms.Command, hostname: hostname });
    }
  }, {
    key: 'eda',
    value: function eda(hostname) {
      return this.get({ type: 'EDA', platform: Platforms.Discover, hostname: hostname });
    }
  }, {
    key: 'etas',
    value: function etas(hostname) {
      return this.get({ type: 'ETA', platform: Platforms.Trace, hostname: hostname });
    }
  }, {
    key: 'exa',
    value: function exa(hostname) {
      return this.get({ type: 'EXA', platform: Platforms.Explore, hostname: hostname });
    }
  }]);

  return Environment;
}(BaseObject);
//# sourceMappingURL=Environment.model.js.map