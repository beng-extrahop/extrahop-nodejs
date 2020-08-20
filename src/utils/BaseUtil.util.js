// BaseUtil.util.js

const crypto = require('crypto');

const base = 16;

const buildQuery = (params) => {
  const keys = Object.keys(params || {}).filter((x) => params[x] != null);

  if (keys.length) {
    return `?${keys.map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&')}`;
  }

  return null;
};

const generateId = (params) => {
  if (!params) {
    return Date.now().toString(base);
  }

  return crypto.createHash('md5').update(JSON.stringify(params), 'utf-8').digest('hex');
};

const parseId = (id) => parseInt(id, base);

module.exports = { buildQuery, generateId, parseId };
