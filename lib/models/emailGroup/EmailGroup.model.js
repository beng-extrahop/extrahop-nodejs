'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// EmailGroup.model.js

var BaseObject = require('../../models/_base/BaseObject.model');

module.exports = function (_BaseObject) {
  _inherits(EmailGroup, _BaseObject);

  function EmailGroup(emailGroup) {
    _classCallCheck(this, EmailGroup);

    var _this = _possibleConstructorReturn(this, (EmailGroup.__proto__ || Object.getPrototypeOf(EmailGroup)).call(this, emailGroup));

    _this.id = emailGroup.id;
    _this.description = emailGroup.description;
    _this.name = emailGroup.name;
    return _this;
  }

  return EmailGroup;
}(BaseObject);
//# sourceMappingURL=EmailGroup.model.js.map