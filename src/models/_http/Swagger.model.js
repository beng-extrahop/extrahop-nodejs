// Download.model.js

const fs = require('fs');
const url = require('url');
const http = require('http');
const { exec } = require('child_process');
const { spawn } = require('child_process');
const BaseObject = require('../_base/BaseObject.model');

module.exports = class Swagger {
  constructor(host, options = {}) {
    this.host = host;
    this.filename = options.filename || 'swagger.json';
    this.scheme = options.scheme || 'https://';
    this.port = options.port || '443';
    this.path = options.path || '/api/v1/api-docs';
    this.downloadUrl = `${this.scheme + this.host}:${this.port}${this.path}`;
    this.downloadDir = options.downloadDir || './';
  }

  get() {
    const mkdir = `mkdir -p ${this.downloadDir}`;

    const child = exec(mkdir, (err, stdout, stderr) => {
      if (err) throw err;
      this.download();
    });
  }

  download() {
    const file = fs.createWriteStream(this.downloadDir + this.filename);

    http.get(this.downloadUrl, (res) => {
      res.on('data', (data) => {
        file.write(data);
      }).on('end', () => {
        file.end();
        console.log(`${this.filename} downloaded to ${this.downloadDir}`);
      });
    });
  }
};
