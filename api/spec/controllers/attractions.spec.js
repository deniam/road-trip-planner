const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');


describe('POST, google search place api', () => {
  test('the response code is 201', async () => {
    let response = await request(app)
      .post('/attractions')
    expect(response.statusCode).toBe(201);
  });

  test('When given two string locations it should return an array of two object with coordinates', async () => {
    let response = await request(app)
      .post('/attractions')
      .send(["Makers Academy", "Tower Bridge"])
    expect(response.body).toEqual([
      {
        'Makers Academy': { latitude: 51.5234156, longitude: -0.08354919999999999 }
      },
      {
        'Tower Bridge': { latitude: 51.5054564, longitude: -0.07535649999999999 }
      }
    ]);
  });

  test('When given four string locations it should return an array of four objects with coordinates', async () => {
    let response = await request(app)
      .post('/attractions')
      .send(["Makers Academy", "London Eye", "Le Wagon", "Tower Bridge"])
    expect(response.body).toEqual([
      {
        'Makers Academy': { latitude: 51.5234156, longitude: -0.08354919999999999 }
      },
      { 
        'London Eye': { latitude: 51.5031864, longitude: -0.1195192 } 
      },
      {
        'Le Wagon': { latitude: 51.53280849999999, longitude: -0.0769292 }
      },
      {
        'Tower Bridge': { latitude: 51.5054564, longitude: -0.07535649999999999 }
      }
    ])
  });
});
