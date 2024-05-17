const request = require('supertest');
const app = require('../app');

describe('Authentication and Book Creation', () => {
  let token;

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'test',
        password: 'password'
      });

    expect(res.statusCode).toEqual(201);
  });

  it('should login and return a token', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'password'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should create a book with authentication', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`) // Attach token to request header
      .send({
        name: 'Test Book',
        description: 'Description Test'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
