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

  const res = await request(app).post('/api/v1/auth/register').send({
    name: 'Resume Tester', email: `resume${Date.now()}@test.com`, password: 'TestPass123', role: 'student',
  });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Resume Endpoints', () => {
  it('POST /api/v1/resumes/upload should create resume', async () => {
    const res = await request(app)
      .post('/api/v1/resumes/upload')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My Test Resume', fileUrl: 'https://example.com/resume.pdf', fileName: 'resume.pdf', fileType: 'pdf' });

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/v1/resumes should return list of resumes', async () => {
    const res = await request(app)
      .get('/api/v1/resumes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/v1/resumes should require authentication', async () => {
    const res = await request(app).get('/api/v1/resumes');
    expect(res.statusCode).toBe(401);
  });
});
