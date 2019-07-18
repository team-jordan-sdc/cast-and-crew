const request = require('supertest');

describe('Express server', () => {

  test('should respond to a valid GET request to /api/movies', async () => {
    const response = await request('http://localhost:3000').get('/api/movies?id=1');
    expect(response.statusCode).toBe(200);
  });

  test('should respond to a valid GET request to /api/personnel', async () => {
    const response = await request('http://localhost:3000').get('/api/personnel?id=5d2fc1860b479000b227a68d');
    expect(response.statusCode).toBe(200);
  });

  test('should NOT respond to a valid GET request to /api/doesntexist', async () => {
    const response = await request('http://localhost:3000').get('/api/doesntexist');
    expect(response.statusCode).toBe(404);
  });

});
