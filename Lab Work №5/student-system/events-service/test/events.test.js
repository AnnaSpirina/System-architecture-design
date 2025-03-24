const request = require('supertest');
const app = require('../src/app');
const server = require('../src/server');

describe('Events Service', () => {
  afterAll((done) => {
    server.close(done); // Останавливаем сервер после завершения тестов
  });

  it('should create a new event', async () => {
    const res = await request(app)
      .post('/events')
      .send({ title: 'Event1', description: 'Description1', date: '2025-03-10', location: 'Location1', organizationId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should generate a QR code for an event', async () => {
    const res = await request(app).get('/events/1/qr-code');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('qrCode');
  });
});