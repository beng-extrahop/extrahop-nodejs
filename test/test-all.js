// test-all.js

const assert = require('assert');
const config = require('toml').parse(require('fs').readFileSync('./config.toml', 'utf-8'));
const env = new (require('../models/environments/Environment.model'))(config);

const spacer = '\n    ';

describe('Extrahop API Tests', function() {
  // App config & default imports
  const extrahop = env.getECA();

  describe(spacer + 'Activity Groups', function() {
    describe('[GET] /activitygroups', function() {
      const value = extrahop.getActivityGroups();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with an object array', function() {
        assert.ok(Array.isArray(value.data));
      });
      it('should have object "oid" attribute', function() {
        assert.notEqual(undefined, value.data[0].oid);
      });
    });

    describe('[GET] /activitygroups/{id}/dashboards', function() {
      const value = extrahop.getActivityGroupDashboards('1');
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with an object array', function() {
        assert.ok(Array.isArray(value.data));
      });
    });
  });

  describe(spacer + 'Activity Maps', function() {
    describe('[GET] /activitymaps', function() {
      const value = extrahop.getActivityMaps();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with an object array', function() {
        assert.ok(Array.isArray(value.data));
      });
    });
  });

  describe(spacer + 'Alerts', function() {
    describe('[GET] /alerts', function() {
      const value = extrahop.getAlerts();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with an object array', function() {
        assert.ok(Array.isArray(value.data));
      });
      it('should have object "stat_name" attribute', function() {
        assert.notEqual(undefined, value.data[0].stat_name);
      });
    });
  });

  describe(spacer + 'Extrahop', function() {
    describe('[GET] /extrahop', function() {
      const value = extrahop.getExtrahop();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with a single object', function() {
        assert.ok(value.data instanceof Object);
      });
      it('should have object "platform" attribute', function() {
        assert.notEqual(undefined, value.data.platform);
      });
    });

    describe('[GET] /extrahop/version', function() {
      const value = extrahop.getExtrahopVersion();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with a single object', function() {
        assert.ok(value.data instanceof Object);
      });
      it('should have object "version" attribute', function() {
        assert.notEqual(undefined, value.data.version);
      });
    });
  });

  describe(spacer + 'Running Config', function() {
    describe('[GET] /runningconfig', function() {
      const value = extrahop.getRunningConfig();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with a single object', function() {
        assert.ok(value.data instanceof Object);
      });
      it('should have object "net" attribute', function() {
        assert.notEqual(undefined, value.data.net);
      });
    });
  });

  describe(spacer + 'Triggers', function() {
    describe('[GET] /triggers', function() {
      const value = extrahop.getTriggers();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with an object array', function() {
        assert.ok(Array.isArray(value.data));
      });
      it('should have at least one object', function() {
        assert.ok(value.data.length > 0);
      });
      it('should have object "script" attribute', function() {
        assert.notEqual(undefined, value.data[0].script);
      });
    });
  });

  describe(spacer + 'Users', function() {
    describe('[GET] /users', function() {
      const value = extrahop.getUsers();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with an object array', function() {
        assert.ok(Array.isArray(value.data));
      });
      it('should have at least one object', function() {
        assert.ok(value.data.length > 0);
      });
    });
  });

  describe(spacer + 'User Groups', function() {
    describe('[GET] /usergroups', function() {
      const value = extrahop.getUserGroups();
      it('should return a valid 200 response', function() {
        assert.equal('200', value.status);
      });
      it('should respond with an object array', function() {
        assert.ok(Array.isArray(value.data));
      });
      it('should have zero or more objects', function() {
        assert.ok(value.data.length >= 0);
      });
    });
  });
});
