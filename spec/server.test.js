const request = require('supertest');

describe('Express server', () => {

  test('should respond to a valid GET request to /api/movies', async () => {
    const response = await request('http://127.0.0.1:3000').get('/api/movies');
    expect(response.statusCode).toBe(200);
  })

  test('should respond to a valid GET request to /api/personnel', async () => {
    const response = await request('http://127.0.0.1:3000').get('/api/personnel');
    expect(response.statusCode).toBe(200);
  })

  test('should NOT respond to a valid GET request to /api/doesntexist', async () => {
    const response = await request('http://127.0.0.1:3000').get('/api/doesntexist');
    expect(response.statusCode).toBe(404);
  })

})