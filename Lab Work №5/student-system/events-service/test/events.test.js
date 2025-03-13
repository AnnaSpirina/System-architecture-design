const request = require('supertest');
const app = require('../src/server');

describe('Events Service', () => {
  it('should create a new event', async () => {
    const res = await request(app)
      .post('/events')
      .send({ title: 'Event1', description: 'Description1', date: '2025-12-03', location: 'Location1', organizationId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should generate a QR code for an event', async () => {
    const res = await request(app).get('/events/1/qr-code');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('qrCode');
  });
});