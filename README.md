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

#### Single Appliance
```js
const eca = new Extrahop(config[0].appliances[0]); // provide Appliance: { hostname, apikey, type }
```

#### Multiple Appliances
```js
const appliances = new Extrahop(config[0].appliances); // provide ApplianceSet: Array[{ Appliance... }]
```

#### Single Environment
```js
const environment = new Extrahop(config.environments[0]); // provide Environment: { name, appliances }
```

#### Multiple Environments
```js
const environments = new Extrahop(config); // provide EnvironmentSet: Array[{ Environment... }]
```

#### Configure From File
```js
const Extrahop = require('extrahop-nodejs');
const config = require('./config.json');

const extrahop = new Extrahop(config);
```

### Activity Groups
#### Defaults
```js
// GET (multiple)
const activityGroups = eca.activityGroups().get();

// GET (single)
const activityGroup = eca.activityGroups().get({ id: activityGroupId });

// POST
eca.activityGroups().post(data);

// PATCH
eca.activityGroups().patch(activityGroup, data);

// PUT
eca.activityGroups().put(activityGroup, data)

// DELETE
eca.activityGroups().delete(activityGroup)
```

### Activity Maps
#### Defaults
```js
// GET (multiple)
const activityMaps = eca.activityMaps().get();

// GET (single)
const activityMap = eca.activityMaps().get({ id: activityMapId });

// POST
eca.activityMaps().post(data);

// PATCH
eca.activityMaps().patch(activityMap, data);

// PUT
eca.activityMaps().put(activityMap, data)

// DELETE
eca.activityMaps().delete(activityMap)
```

### Alerts
#### Defaults
```js
// GET (multiple)
const alerts = eca.alerts().get();

// GET (single)
const alert = eca.alerts().get({ id: alertId });

// POST
eca.alerts().post(data);

// PATCH
eca.alerts().patch(alert, data);

// PUT
eca.alerts().put(alert, data)

// DELETE
eca.alerts().delete(alert)
```

### Analysis Priority
#### Defaults
```js
// GET (single)
const analysisPriority = eca.analysisPriority().get();

// PATCH
eca.analysisPriority().patch(appliance, data);

// DELETE
eca.analysisPriority().delete(alert)
```

### API Keys
#### Defaults
```js
// GET (multiple)
const apikeys = eca.apikeys().get();

// GET (single)
const apikey = eca.apikeys().get({ id: apikeyId });

// POST
eca.apikeys().post(password);
````

### Custom Devices
#### Defaults
```js
// GET (multiple)
const customDevices = eca.customDevices().get();

// GET (single)
const customDevice = eca.customDevices().get({ id: customDeviceId });

// POST
eca.customDevices().post(data);

// PATCH
eca.customDevices().patch(customDevice, data);

// PUT
eca.customDevices().put(customDevice, data)

// DELETE
eca.customDevices().delete(customDevice)
```

### Dashboards
#### Defaults
```js
// GET (multiple)
const dashboards = eca.dashboards().get();

// GET (single)
const dashboard = eca.dashboards().get({ id: dashboardId });

// POST
eca.dashboards().post(data);

// PATCH
eca.dashboards().patch(dashboard, data);

// PUT
eca.dashboards().put(dashboard, data)

// DELETE
eca.dashboards().delete(dashboard)
```

### Devices
#### Defaults
```js
// GET (multiple)
const devices = eca.devices().get();

// GET (single)
const device = eca.devices().get({ id: deviceId });

// POST
eca.devices().post(data);

// PATCH
eca.devices().patch(device, data);

// PUT
eca.devices().put(device, data)

// DELETE
eca.devices().delete(device)
```

### Device Groups
#### Defaults
```js
// GET (multiple)
const deviceGroups = eca.deviceGroups().get();

// GET (single)
const deviceGroup = eca.deviceGroups().get({ id: deviceGroupId });

// POST
eca.deviceGroups().post(data);

// PATCH
eca.deviceGroups().patch(deviceGroup, data);

// PUT
eca.deviceGroups().put(deviceGroup, data)

// DELETE
eca.deviceGroups().delete(deviceGroup)
```

### License
#### Defaults
```js
// GET
const license = eca.license().get();

// POST
eca.license().post(data);

// PATCH
eca.license().patch(license, data);

// PUT
eca.license().put(license, data)

// DELETE
eca.license().delete(license)
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

### Triggers
#### Defaults
```js
// GET (multiple)
const triggers = eca.triggers().get();

// GET (single)
const trigger = eca.triggers().get({ id: triggerId });

// POST
eca.triggers().post(data);

// PATCH
eca.triggers().patch(trigger, data);

// PUT
eca.triggers().put(trigger, data)

// DELETE
eca.triggers().delete(trigger)
```
