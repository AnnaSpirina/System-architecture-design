const request = require('supertest');
const app = require('../src/server');

describe('Organizations Service', () => {
  it('should create a new organization', async () => {
    const res = await request(app)
      .post('/organizations')
      .send({ name: 'Org1', description: 'Description1', logo: 'logo1' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should assign a leader to an organization', async () => {
    const res = await request(app)
      .post('/organizations/1/assign-leader')
      .send({ userId: 123 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('leaderId', 123);
  });
});