const Extrahop = require('../index');
const config = require('../config');

const extrahop = new Extrahop(config, { quiet: true });

describe('Activity Group endpoints', () => {
  it('GET many: activityGroups.get()', async () => {
    const data = await extrahop.eca.activityGroups.get();
    expect(data[0]).toHaveProperty('description');
    expect(data[0]).toHaveProperty('type');
  });

  it('GET one: activityGroups.get({ id })', async () => {
    const data = await extrahop.eca.activityGroups.get({ id: 19 });
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('type');
  });
});
