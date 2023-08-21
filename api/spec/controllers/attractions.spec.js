
const app = require("../../app");
require('../mongodb_helper');
const request = require("supertest");
const {singlePlaceMock, nearbyPlacesMock} = require ('../../mocks/singlePlaceMock')
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require('../../models/user')
let token;
let user1;

describe('POST', () => {
  beforeEach( async () => {
    await User.deleteMany({});
    user1 = new User ({
        email: "test@test.com",
        password: "test",
        username: "myusername",
    });
    await user1.save();
    token = JWT.sign(
        {
        user_id: user1.id,
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
        },
        secret
    )
  });

  test('When no valid token is passed in it should return 500', async () => {
    let response = await request(app)
      .post('/attractions')
      .send([])
    expect(response.statusCode).toEqual(401);
  
  });

  //test('When given two string locations return an array of locations objects with the nearest location first and no duplicates', async () => {
    
  //  let response = await request(app)
  //    .post('/attractions')
  //    .set("Authorization", `Bearer ${token}`)
  //    .send({locations:["Hackney Farm", "Windsor Castle"]})
  //  expect(response.statusCode).toBe(201);
  //  expect(response.body.attractions).toEqual([singlePlaceMock[1], singlePlaceMock[3], singlePlaceMock[2],singlePlaceMock[4], singlePlaceMock[0] ])

  //});
  
});




  
    

















