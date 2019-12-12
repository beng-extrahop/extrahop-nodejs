# extrahop-nodejs

## Requirements

- Node
- npm

## Quick Start

### Setup

Create project directory:

```sh
mkdir my-extrahop-cli
cd ./my-extrahop-cli
```

Initialize project:

```sh
npm init
mkdir -p data/{db,csv}
touch index.js
```

### Install

```sh
npm install --save extrahop-nodejs@latest
```

### Run

```js
node index.js
```

### Import

```js
const Extrahop = require('extrahop-nodejs');
```

## Documentation

### Config File

Module accepts the following structure, either whole or in part:

```js
[
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
  ...Environment
]
```

### Examples

```js
// my-extrahop-cli/index.js

const Extrahop = require('extrahop-nodejs');
const config = require('./config');

// Single host: provide Appliance: { hostname, apikey, type }

const eca = new Extrahop(config[0].appliances[0])

// ...or simply:

const eca = new Extrahop({
  hostname: 'extrahop.domain.internal',
  apikey: 'XXXXXXXXXXXXXX',
  type: 'ECA'
});


// Multiple hosts: provide ApplianceSet: Array[...Appliance]
const appliances = new Extrahop(config[0].appliances);

// Single environment: provide Environment{ name, appliances: [...Appliance] }
const environment = new Extrahop(config.environments[0]);

// Multiple environments; provide EnvironmentSet: Array[...Environment]
const environments = new Extrahop(config); //
```

### Example from File

```js
// my-extrahop-cli/index.js

const Extrahop = require('extrahop-nodejs');

const env = new Extrahop(config);
```

### Activity Groups

#### Default

```js
// GET (all)
const activityGroups = eca.activityGroups().get();

// GET (single)
const activityGroup = eca.activityGroups().get({ id: activityGroupId });
```

### Activity Maps

#### Default

```js
// GET (all)
const activityMaps = eca.activityMaps().get();

// GET (single)
const activityMap = eca.activityMaps().get({ id: activityMapId });

// GET
const sharing = eca.activityMaps().getSharing({ id: activityMapId });

// POST
eca.activityMaps().post(activityMap);

// POST (query all)
eca.activityMaps().query(data);

// POST (query single)
eca.activityMaps().query(data, { id: activityMap.id })

// PATCH
eca.activityMaps().update({ id: activityMap.id }, data);

// DELETE
eca.activityMaps().delete({ id: activityMap.id });
```

### Alerts

#### Default

```js
// GET (all)
const alerts = eca.alerts().get();

// GET (single)
const alert = eca.alerts().get({ id: alertId });

// POST
eca.alerts().post(alert);

// PATCH
eca.alerts().update({ id: alert.id }, data);

// DELETE
eca.alerts().delete({ id: alert.id });
```

### Analysis Priority

#### Default

```js
// GET (single)
const analysisPriority = eca.analysisPriority().get();

// PATCH
eca.analysisPriority().update({ id: appliance.id }, data);

// DELETE
eca.analysisPriority().delete({ id: alert.id });
```

### API Keys

#### Default

```js
// GET (all)
const apikeys = eca.apikeys().get();

// GET (single)
const apikey = eca.apikeys().get({ id: apikeyId });

// POST
eca.apikeys().set(password);
````

### Appliances

#### Default

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

#### Default

```js
// GET (all)
const applications = eca.applications().get();

// GET (single)
const application = eca.applications().get({ id: applicationId });

// POST
eca.applications().post(application);

// PATCH
eca.applications().update({ id: application.id }, data);

// DELETE
eca.applications().delete({ id: application.id });
```

### Audit Logs

#### Default

```js
// GET (all)
const auditLogs = eca.auditLogs().get();

// GET (single)
const auditLog = eca.auditLogs().get({ id: auditLogId });

// POST
eca.auditLogs().post(auditLog);

// PATCH
eca.auditLogs().update({ id: auditLog.id }, data);

// DELETE
eca.auditLogs().delete({ id: auditLog.id });
```

### Bundles

#### Default

```js
// GET (all)
const bundles = eca.bundles().get();

// GET (single)
const bundle = eca.bundles().get({ id: bundleId });

// POST
eca.bundles().post(bundle);

// DELETE
eca.bundles().delete({ id: bundle.id });

// POST
eca.bundles().apply({ id: bundle.id });
```

### Custom Devices

#### Default

```js
// GET (all)
const customDevices = eca.customDevices().get();

// GET (single)
const customDevice = eca.customDevices().get({ id: customDeviceId });

// POST
eca.customDevices().post(customDevice);

// PATCH
eca.customDevices().update({ id: customDevice.id }, data);

// DELETE
eca.customDevices().delete({ id: customDevice.id });
```

### Customizations

#### Default

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
eca.customizations().delete({ id: customization.id });
```

### Dashboards

#### Default

```js
// GET (all)
const dashboards = eca.dashboards().get();

// GET (single)
const dashboard = eca.dashboards().get({ id: dashboardId });

// POST
eca.dashboards().post(dashboard);

// PATCH
eca.dashboards().update({ id: dashboard.id }, data);

// DELETE
eca.dashboards().delete({ id: dashboard.id });
```

### Devices

#### Default

```js
// GET (all)
const devices = eca.devices().get();

// GET (single)
const device = eca.devices().get({ id: deviceId });

// PATCH
eca.devices().update({ id: device.id }, data);
```

### Device Groups

#### Default

```js
// GET (all)
const deviceGroups = eca.deviceGroups().get();

// GET (single)
const deviceGroup = eca.deviceGroups().get({ id: deviceGroupId });

// POST
eca.deviceGroups().post(deviceGroup);

// PATCH
eca.deviceGroups().update({ id: deviceGroup.id }, data);

// DELETE
eca.deviceGroups().delete({ id: deviceGroup.id });
```

### License

#### Default

```js
// GET
const license = eca.license().get();
```

### Records

### Search & Save

```js
const rules = {
  'operator': 'or',
  'rules': [
    {
      'field': 'name',
      'operator': 'startswith',
      'value': 'domain1'
    },
    {
      'field': 'name',
      'operator': '~',
      'value': '^domain2'
    }
  ]
};

const filter = {
  filter: rules,
  types: ['~ssl_open', '~ssl_close'], // default: any
  limit: 500, // default: 1000
  from: '-60m', // default: 30m
  until: '-30m', // default: now
};

const search = eca.records().search(filter, { save: true });
eca.records().toCSV(search);
```

### Software

#### Default

```js
// GET (all)
const softwares = eca.software().get();

// GET (single)
const software = eca.software().get({ id: softwareId });
```

### Triggers

#### Default

```js
// GET (all)
const triggers = eca.triggers().get();

// GET (single)
const trigger = eca.triggers().get({ id: triggerId });

// POST
eca.triggers().post(trigger);

// PATCH
eca.triggers().update({ id: trigger.id }, data);

// DELETE
eca.triggers().delete({ id: trigger.id });
```
