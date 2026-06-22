const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app, mongod, token;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  process.env.JWT_SECRET = 'test-secret-key-for-testing-only-32-chars';
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGODB_URI);

  app = require('../server').app;

  // Register a test user to get token
  const res = await request(app).post('/api/v1/auth/register').send({
    name: 'User Test', email: `user${Date.now()}@test.com`, password: 'TestPass123', role: 'student',
  });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('User Endpoints', () => {
  it('GET /api/v1/users/profile should return user data with valid token', async () => {
    const res = await request(app)
      .get('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/v1/users/profile should reject without token', async () => {
    const res = await request(app).get('/api/v1/users/profile');
    expect(res.statusCode).toBe(401);
  });

  it('GET /api/v1/users/profile should reject with invalid token', async () => {
    const res = await request(app)
      .get('/api/v1/users/profile')
      .set('Authorization', 'Bearer invalid-token');

    expect(res.statusCode).toBe(401);
  });
});
