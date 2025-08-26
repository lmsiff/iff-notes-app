import request from 'supertest';
import app from '../../app.js';

describe('Note Controller', () => {
  it('should create a note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'Test', content: 'Test Content' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should return all notes', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
