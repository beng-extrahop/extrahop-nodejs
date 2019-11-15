## extrahop-nodejs

### Requirements:
- Node
- npm

### Install

Create project directory:
```sh
mkdir my-extrahop-cli
cd ./my-extrahop-cli
```

Install package files:
```sh
npm install extrahop-nodejs
```

Create main JS file, data dirs:
```sh
mkdir -p data/{db,csv}
touch index.js
```

### Run
```js
node index.js
```

### Import
```js
const Extrahop = require('extrahop-nodejs');
```

### Config
Module accepts the following structure, either whole or in part:
```js
const config = [
  {
    name: 'my-environment',
    appliances: [
      {
        hostname: 'extrahop.domain.internal',
        apikey: 'XXXXXXXXXXXXXX',
        type: 'ECA'
      },
      {
        hostname: 'eda01.domain.internal',
        apikey: 'XXXXXXXXXXXXXX',
        type: 'EDA'
      },
      {
        hostname: 'eda02.domain.internal',
        apikey: 'XXXXXXXXXXXXXX',
        type: 'EDA'
      }
    ]
  },
  { ...Environment }
];
```

#### Example
```js
const Extrahop = require('extrahop-nodejs');

// Single host: provide Appliance: { hostname, apikey, type }
const eca = new Extrahop(config[0].appliances[0]); //

// Multiple hosts: provide ApplianceSet: Array[...Appliance]
const appliances = new Extrahop(config[0].appliances);

// Single environment: provide Environment{ name, appliances: [...Appliance] }
const environment = new Extrahop(config.environments[0]);

// Multiple environments; provide EnvironmentSet: Array[...Environment]
const environments = new Extrahop(config); //
```

#### Example from File
```js
const Extrahop = require('extrahop-nodejs');
const config = require('./config.json');

const extrahop = new Extrahop(config);
```

### Activity Groups
#### Defaults
```js
// GET (all)
const activityGroups = eca.activityGroups().get();

// GET (single)
const activityGroup = eca.activityGroups().get({ id: activityGroupId });
```

### Activity Maps
#### Defaults
```js
// GET (all)
const activityMaps = eca.activityMaps().get();

// GET (single)
const activityMap = eca.activityMaps().get({ id: activityMapId });

// GET
const sharing = eca.activityMaps().getSharing({ id: activityMapId });

// POST
eca.activityMaps().create(activityMap);

// POST (query all)
eca.activityMaps().query(data);

// POST (query single)
eca.activityMaps().query(data, { id: activityMap.id })

// PATCH
eca.activityMaps().update({ id: activityMap.id }, data);

// DELETE
eca.activityMaps().delete({ id: activityMap.id })
```

### Alerts
#### Defaults
```js
// GET (all)
const alerts = eca.alerts().get();

// GET (single)
const alert = eca.alerts().get({ id: alertId });

// POST
eca.alerts().create(alert);

// PATCH
eca.alerts().update({ id: alert.id }, data);

// DELETE
eca.alerts().delete({ id: alert.id })
```

### Analysis Priority
#### Defaults
```js
// GET (single)
const analysisPriority = eca.analysisPriority().get();

// PATCH
eca.analysisPriority().update({ id: appliance.id }, data);

// DELETE
eca.analysisPriority().delete({ id: alert.id })
```

### API Keys
#### Defaults
```js
// GET (all)
const apikeys = eca.apikeys().get();

// GET (single)
const apikey = eca.apikeys().get({ id: apikeyId });

// POST
eca.apikeys().set(password);
````

### Appliances
#### Defaults
```js
// GET (all)
const appliances = eca.appliances().get();

// GET (single)
const appliance = eca.appliances().get({ id: applianceId });

// POST
eca.appliances().connect(connection);

// GET (cloud services)
const cloudServices = eca.appliances().getCloudServices({ id: applianceId });

// GET (product key)
const productKey = eca.appliances().getProductKey({ id: applianceId });
```

### Applications
#### Defaults
```js
// GET (all)
const applications = eca.applications().get();

// GET (single)
const application = eca.applications().get({ id: applicationId });

// POST
eca.applications().create(application);

// PATCH
eca.applications().update({ id: application.id }, data);

// DELETE
eca.applications().delete({ id: application.id })
```

### Audit Logs
#### Defaults
```js
// GET (all)
const auditLogs = eca.auditLogs().get();

// GET (single)
const auditLog = eca.auditLogs().get({ id: auditLogId });

// POST
eca.auditLogs().create(auditLog);

// PATCH
eca.auditLogs().update({ id: auditLog.id }, data);

// DELETE
eca.auditLogs().delete({ id: auditLog.id })
```

### Bundles
#### Defaults
```js
// GET (all)
const bundles = eca.bundles().get();

// GET (single)
const bundle = eca.bundles().get({ id: bundleId });

// POST
eca.bundles().create(bundle);

// DELETE
eca.bundles().delete({ id: bundle.id })

// POST
eca.bundles().apply({ id: bundle.id });
```

### Custom Devices
#### Defaults
```js
// GET (all)
const customDevices = eca.customDevices().get();

// GET (single)
const customDevice = eca.customDevices().get({ id: customDeviceId });

// POST
eca.customDevices().create(customDevice);

// PATCH
eca.customDevices().update({ id: customDevice.id }, data);

// DELETE
eca.customDevices().delete({ id: customDevice.id })
```

### Customizations
#### Defaults
```js
// GET (all)
const customizations = eca.customizations().get();

// GET (single)
const customization = eca.customizations().get({ id: customizationId });

// POST (create backup)
eca.customizations().backup(backupName);

// POST (restore backup)
eca.customizations().restore({ id: customization.id });

// POST (download backup)
eca.customizations().save({ id: customization.id });

// DELETE
eca.customizations().delete({ id: customization.id })
```

### Dashboards
#### Defaults
```js
// GET (all)
const dashboards = eca.dashboards().get();

// GET (single)
const dashboard = eca.dashboards().get({ id: dashboardId });

// POST
eca.dashboards().create(dashboard);

// PATCH
eca.dashboards().update({ id: dashboard.id }, data);

// DELETE
eca.dashboards().delete({ id: dashboard.id })
```

### Devices
#### Defaults
```js
// GET (all)
const devices = eca.devices().get();

// GET (single)
const device = eca.devices().get({ id: deviceId });

// POST
eca.devices().create(device);

// PATCH
eca.devices().update({ id: device.id }, data);

// DELETE
eca.devices().delete({ id: device.id })
```

### Device Groups
#### Defaults
```js
// GET (all)
const deviceGroups = eca.deviceGroups().get();

// GET (single)
const deviceGroup = eca.deviceGroups().get({ id: deviceGroupId });

// POST
eca.deviceGroups().create(deviceGroup);

// PATCH
eca.deviceGroups().update({ id: deviceGroup.id }, data);

// DELETE
eca.deviceGroups().delete({ id: deviceGroup.id })
```

### License
#### Defaults
```js
// GET
const license = eca.license().get();
```

### Records

#### Search & Save
```js
const params = {
  types: ['~ssl_open', '~ssl_close'], // default: any
  limit: 500, // default: 1000
  from: '-60m', // default: 30m
  until: '-30m', // default: now
};

const search = eca.records().search(params);
eca.records().saveToCSV(search);
```

### Software
#### Defaults
```js
// GET (all)
const softwares = eca.software().get();

// GET (single)
const software = eca.software().get({ id: softwareId });
```

### Triggers
#### Defaults
```js
// GET (all)
const triggers = eca.triggers().get();

// GET (single)
const trigger = eca.triggers().get({ id: triggerId });

// POST
eca.triggers().create(trigger);

// PATCH
eca.triggers().update({ id: trigger.id }, data);

// DELETE
eca.triggers().delete({ id: trigger.id })
```
