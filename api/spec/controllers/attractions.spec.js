const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');


describe('POST, google search place api', () => {
  test('the response code is 201 and contains coordinates', async () => {
    let response = await request(app)
      .post('/attractions')
    console.log(response)
    expect(response.statusCode).toBe(201);
  });
});
