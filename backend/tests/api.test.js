const request = require('supertest');
const app = require('../src/server');

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/courses', () => {
    it('should return courses list', async () => {
      const response = await request(app)
        .get('/api/courses')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/schedule', () => {
    it('should return schedules list', async () => {
      const response = await request(app)
        .get('/api/schedule')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/schedule', () => {
    it('should create a new schedule', async () => {
      const newSchedule = {
        name: 'Test Schedule',
        semester: 'Fall 2024',
        courses: []
      };

      const response = await request(app)
        .post('/api/schedule')
        .send(newSchedule)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('name', newSchedule.name);
      expect(response.body.data).toHaveProperty('semester', newSchedule.semester);
    });

    it('should return 400 for invalid schedule data', async () => {
      const invalidSchedule = {
        name: 'Test Schedule'
        // Missing semester
      };

      await request(app)
        .post('/api/schedule')
        .send(invalidSchedule)
        .expect(400);
    });
  });
});