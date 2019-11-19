// BaseUtil.util.js

const Crypto = require('crypto');

const buildQuery = (params = {}) => {
  const keys = Object.keys(params).filter(x => params[x] != null);

  if (keys.length) {
    return `?${keys.map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')}`;
  }
};

const base = 16;

const generateId = params => {
  if (params) {
    return Crypto.createHash('md5')
      .update(JSON.stringify(params), 'utf-8')
      .digest('hex');
  }
  return Date.now().toString(base);
};

const parseId = id => {
  if (id) return parseInt(id, base);
};

module.exports = { buildQuery, generateId, parseId };
