# extrahop-nodejs

## Requirements

- Node
- npm

## Quick Start

### Setup

In an empty directory...

```sh
npm install --save extrahop-nodejs

# Main script & config files
touch index.js config.json

# (Optional) Directories for data export
mkdir -p data/{db,csv}
```

### Run

```js
node index.js
```

## Documentation

### Config

Module accepts the following structure, either whole or in part and from file (using require) or variable.
The examples section below demonstrates both inline and external file (config.json) methods.

```json
[
  {
    "name": "my-environment",
    "appliances": [
      {
        "hostname": "extrahop.internal",
        "apikey": "XXXXXXXXXXXXXX",
        "type": "ECA"
      },
      {
        "hostname": "extrahop-eda-01.internal",
        "apikey": "XXXXXXXXXXXXXX",
        "type": "EDA"
      },
      {
        "hostname": "extrahop-eda-02.internal",
        "apikey": "XXXXXXXXXXXXXX",
        "type": "EDA"
      },
    ]
  }
]
```

### Examples

#### Configuration

```js
// my-extrahop-cli/index.js

// Uncomment if using self-signed certs
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Extrahop = require('extrahop-nodejs');
const config = require('./config.json');

const extrahop = new Extrahop(config);

const eca = extrahop.getECA();
const edas = extrahop.getEDAs();
```

#### Configuration (without external config.json)

```js
// my-extrahop-cli/index.js

// Uncomment if using self-signed certs
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Extrahop = require('extrahop-nodejs');

const eca = new Extrahop({
  hostname: 'extrahop.internal',
  apikey: 'XXXXXXXXXXXXXX',
  type: 'ECA'
});

const edas = new Extrahop([
  {
    hostname: 'extrahop-eda-01.internal',
    apikey: 'XXXXXXXXXXXXXX',
    type: 'EDA'
  },
  {
    hostname: 'extrahop-eda-02.internal',
    apikey: 'XXXXXXXXXXXXXX',
    type: 'EDA'
  }
]);
```

### Activity Groups

```js
// GET (all)
let activityGroups = eca.activityGroups.get();

// GET (single)
let activityGroup = eca.activityGroups.get({ id: activityGroupId });
```

### Activity Maps

```js
// GET (all)
let activityMaps = eca.activityMaps.get();

// GET (single)
let activityMap = eca.activityMaps.get({ id: activityMapId });

// GET
let sharing = eca.activityMaps.getSharing({ id: activityMapId });

// POST
eca.activityMaps.post(activityMap);

// POST (query all)
eca.activityMaps.query(data);

// POST (query single)
eca.activityMaps.query(data, { id: activityMap.id })

// PATCH
eca.activityMaps.update({ id: activityMap.id }, data);

// DELETE
eca.activityMaps.delete({ id: activityMap.id });
```

### Alerts

```js
// GET (all)
let alerts = eca.alerts.get();

// GET (single)
let alert = eca.alerts.get({ id: alertId });

// POST
eca.alerts.post(alert);

// PATCH
eca.alerts.update({ id: alert.id }, data);

// DELETE
eca.alerts.delete({ id: alert.id });
```

### Analysis Priority

```js
// GET (single)
let analysisPriority = eca.analysisPriority.get();

// PATCH
eca.analysisPriority.setManager({ id: appliance.id });

// PUT
eca.analysisPriority.create({ id: appliance.id });
```

### API Keys

```js
// GET (all)
let apikeys = eca.apikeys.get();

// GET (single)
let apikey = eca.apikeys.get({ id: apikeyId });

// POST
eca.apikeys.set(password);
````

### Appliances

```js
// GET (all)
let appliances = eca.appliances.get();

// GET (single)
let appliance = eca.appliances.get({ id: applianceId });

// POST
eca.appliances.connect(connection);

// GET (cloud services)
let cloudServices = eca.appliances.getCloudServices({ id: applianceId });

// GET (product key)
let productKey = eca.appliances.getProductKey({ id: applianceId });
```

### Applications

```js
// GET (all)
let applications = eca.applications.get();

// GET (single)
let application = eca.applications.get({ id: applicationId });

// POST
eca.applications.post(application);

// PATCH
eca.applications.update({ id: application.id }, data);

// DELETE
eca.applications.delete({ id: application.id });
```

### Audit Logs

```js
// GET (all)
let auditLogs = eca.auditLogs.get();

// GET (single)
let auditLog = eca.auditLogs.get({ id: auditLogId });

// POST
eca.auditLogs.post(auditLog);

// PATCH
eca.auditLogs.update({ id: auditLog.id }, data);

// DELETE
eca.auditLogs.delete({ id: auditLog.id });
```

### Bundles

```js
// GET (all)
let bundles = eca.bundles.get();

// GET (single)
let bundle = eca.bundles.get({ id: bundleId });

// POST
eca.bundles.post(bundle);

// DELETE
eca.bundles.delete({ id: bundle.id });

// POST
eca.bundles.apply({ id: bundle.id });
```

### Custom Devices

```js
// GET (all)
let customDevices = eca.customDevices.get();

// GET (single)
let customDevice = eca.customDevices.get({ id: customDeviceId });

// POST
eca.customDevices.post(customDevice);

// PATCH
eca.customDevices.update({ id: customDevice.id }, data);

// DELETE
eca.customDevices.delete({ id: customDevice.id });
```

### Customizations

```js
// GET (all)
let customizations = eca.customizations.get();

// GET (single)
let customization = eca.customizations.get({ id: customizationId });

// POST (create backup)
eca.customizations.backup(backupName);

// POST (restore backup)
eca.customizations.restore({ id: customization.id });

// POST (download backup)
eca.customizations.save({ id: customization.id });

// DELETE
eca.customizations.delete({ id: customization.id });
```

### Dashboards

```js
// GET (all)
let dashboards = eca.dashboards.get();

// GET (single)
let dashboard = eca.dashboards.get({ id: dashboardId });

// POST
eca.dashboards.post(dashboard);

// PATCH
eca.dashboards.update({ id: dashboard.id }, data);

// DELETE
eca.dashboards.delete({ id: dashboard.id });
```

### Devices

```js
// GET (all)
let devices = eca.devices.get();

// GET (single)
let device = eca.devices.get({ id: deviceId });

// PATCH
eca.devices.update({ id: device.id }, data);
```

### Device Groups

```js
// GET (all)
let deviceGroups = eca.deviceGroups.get();

// GET (single)
let deviceGroup = eca.deviceGroups.get({ id: deviceGroupId });

// POST
eca.deviceGroups.post(deviceGroup);

// PATCH
eca.deviceGroups.update({ id: deviceGroup.id }, data);

// DELETE
eca.deviceGroups.delete({ id: deviceGroup.id });
```

### License

```js
// GET
let license = eca.license.get();
```

### Records

### Search & Save

```js
let rules = {
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

let filter = {
  filter: rules,
  types: ['~ssl_open', '~ssl_close'], // default: any
  limit: 500, // default: 1000
  from: '-60m', // default: 30m
  until: '-30m', // default: now
};

// Save records to local NeDB file (./data/db)
let search = eca.records.store(filter);

// Read from database and write to CSV (./data/csv)
eca.records.save(search);
```

### Software

```js
// GET (all)
let software = eca.software.get();

// GET (single)
let software = eca.software.get({ id: softwareId });
```

### Triggers

```js
// GET (all)
let triggers = eca.triggers.get();

// GET (single)
let trigger = eca.triggers.get({ id: triggerId });

// POST
eca.triggers.post(trigger);

// PATCH
eca.triggers.update({ id: trigger.id }, data);

// DELETE
eca.triggers.delete({ id: trigger.id });
```
