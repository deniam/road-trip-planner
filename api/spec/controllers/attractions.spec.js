
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
  
});




  
    

















