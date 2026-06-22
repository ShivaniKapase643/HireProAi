const request = require('supertest');

let app;

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-key-for-testing-only-32-chars';
  process.env.NODE_ENV = 'test';
  app = require('../server').app;
});

describe('Health Check Endpoint', () => {
  it('GET /api/health should return status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('uptime');
  });

  it('GET /unknown-route should return 404', async () => {
    const res = await request(app).get('/api/v1/non-existent');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
