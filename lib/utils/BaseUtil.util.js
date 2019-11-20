'use strict';

// BaseUtil.util.js

var crypto = require('crypto');

var base = 16;

var buildQuery = function buildQuery(params) {
  var keys = Object.keys(params || {}).filter(function (x) {
    return params[x] != null;
  });

  if (keys.length) {
    return '?' + keys.map(function (key) {
      return key + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }

  return null;
};

var generateId = function generateId(params) {
  if (!params) {
    return Date.now().toString(base);
  }

  return crypto.createHash('md5').update(JSON.stringify(params), 'utf-8').digest('hex');
};

var parseId = function parseId(id) {
  return parseInt(id, base);
};

module.exports = { buildQuery: buildQuery, generateId: generateId, parseId: parseId };
//# sourceMappingURL=BaseUtil.util.js.map