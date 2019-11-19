// ActivityGroup.controller.js

const SyncRequest = require('sync-request');
const BaseCtrl = require('../../controllers/_base/BaseCtrl.controller');
const Response = require('../../models/_http/Response.model');
const { Icons } = require('../../constants/Global.constants');

module.exports = class RequestCtrl extends BaseCtrl {
  constructor(request) {
    super();
    this.request = request;
  }

  send({ method, uri, qs, json }) {
    const { headers } = this;
    const config = Object.assign({ headers, qs, json }, this.config);

    let response = {};

    try {
      response = SyncRequest(method, this.url + uri, config);
      response.data = response.getBody('utf8');
    }
    catch (err) {
      response.error = err;
      console.log(`${Icons.Error} ${err}`);
    }

    response.method = method;
    return new Response(response);
  }

  get(uri, query) {
    return this.send({ method: 'GET', uri, qs: query });
  }

  post(uri, body) {
    return this.send({ method: 'POST', uri, json: body });
  }

  patch(uri, body) {
    return this.send({ method: 'PATCH', uri, json: body });
  }

  put(uri, body) {
    return this.send({ method: 'PUT', uri, json: body });
  }

  delete(uri, body) {
    return this.send({ method: 'DELETE', uri, json: body });
  }
};
