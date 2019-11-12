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

#### From File
```js
const Extrahop = require('extrahop-nodejs');
const config = require('./config.json');

const extrahop = new Extrahop(config);
```

### Activity Groups
#### Find
```js
const activityGroups = eca.activityGroups().get();

activityGroups.forEach(activityGroup => {
  const dashboards = eca.activityGroups().getDashboards(activityGroup);
  dashboards.forEach(dashboard => dashboard.print());
});
```

### Activity Maps
#### Find
```js
const activityMaps = eca.activityMaps().get();

activityMaps.forEach(activityMap => {
  activityMap.print();
});
```

### Alerts
#### Find
```js
const alerts = eca.alerts().get();

alerts.forEach(alert => {
  alert.print());
});
```

### Custom Devices
#### Find
```js
const customDevices = eca.customDevices().get();

customDevices.forEach(customDevice => {
  customDevice.print());
});
```

### Dashboards
#### Find
```js
const dashboards = eca.dashboards().get();

dashboards.forEach(dashboard => {
  dashboard.print());
});
```

### Devices
#### Find
```js
const devices = eca.devices().get();

devices.forEach(device => {
  device.print());
});
```

### Device Groups
#### Find
```js
const deviceGroups = eca.deviceGroups().get();

deviceGroups.forEach(deviceGroup => {
  deviceGroup.print());
});
```

### Licenses
```js
const license = eca.license();

license.print();
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

#### Triggers
```js
const triggers = eca.triggers().get();

triggers.forEach(trigger => {
  trigger.print());
});
```
