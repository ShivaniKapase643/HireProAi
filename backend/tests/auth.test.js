const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  process.env.JWT_SECRET = 'test-secret-key-for-testing-only-32-chars';
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGODB_URI);

  app = require('../server').app;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Auth Endpoints', () => {
  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'TestPass123',
    role: 'student',
  };

  it('POST /api/v1/auth/register should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testUser.email);
  });

  it('POST /api/v1/auth/register should reject duplicate email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(400);
  });

  it('POST /api/v1/auth/register should reject weak password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ ...testUser, email: 'weak@test.com', password: '123' });

    expect(res.statusCode).toBe(400);
  });

  it('POST /api/v1/auth/login should authenticate valid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/v1/auth/login should reject invalid password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: 'WrongPass' });

    expect(res.statusCode).toBe(401);
  });
});
