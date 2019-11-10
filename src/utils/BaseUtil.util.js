// BaseUtil.util.js

const buildQuery = (params = {}) => {
  const keys = Object.keys(params).filter(x => params[x] != null);

  if ( !!keys.length ) {
    return '?' + encodeURIComponent(keys.map(key => `${key}=${params[key]}`).join('&'));
  }
}

module.exports = { buildQuery }
