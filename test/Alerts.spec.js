const Extrahop = require('../index');
const config = require('../config');

const extrahop = new Extrahop(config, { quiet: true });

describe('Alert endpoints', () => {
  it('GET many: alerts.get()', async () => {
    const data = await extrahop.eca.alerts.get();
    expect(data[0]).toHaveProperty('description');
    expect(data[0]).toHaveProperty('type');
  });

  it('GET one: alerts.get({ id })', async () => {
    const data = await extrahop.eca.alerts.get({ id: 19 });
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('type');
  });
});
