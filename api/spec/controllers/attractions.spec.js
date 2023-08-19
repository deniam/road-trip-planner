
const app = require("../../app");
const fetchMock = require("jest-fetch-mock");

require('../mongodb_helper');
const request = require("supertest");
const {singlePlaceMock, nearbyPlacesMock} = require ('../../mocks/singlePlaceMock')
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require('../../models/user')
let token;
let user1;
fetchMock.enableMocks();

describe('POST', () => {
  beforeEach( async () => {
    fetchMock.resetMocks();
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

  test('When given two string locations return an array of locations objects with the nearest location first and no duplicates', async () => {
    
    let response = await request(app)
      .post('/attractions')
      .set("Authorization", `Bearer ${token}`)
      .send({locations:["Hackney Farm", "Windsor Castle"]})
    expect(response.statusCode).toBe(201);
    expect(response.body.attractions).toEqual([singlePlaceMock[1], singlePlaceMock[3], singlePlaceMock[2],singlePlaceMock[4], singlePlaceMock[0] ])

  });
  
});




  
    

















// describe('POST, user input search strings returns array of 5 attractions per search string', () => {
//   beforeEach(() => {
//     fetch.resetMocks();
//   });

//   // test('the response code is 201', async () => {
//   //   let response = await request(app)
//   //     .post('/attractions')
//   //     .send(["Hackney Farm"])
//   //   expect(response.statusCode).toBe(201);
//   // });

//   test('When empty input array it should return 400', async () => {
//     let response = await request(app)
//       .post('/attractions')
//       .send([])
//     expect(response.statusCode).toEqual(400);
//   });
    
//   test('When given two string locations it should return an array of two object with the first nearby place', async () => {
//     fetch.mockResponseOnce(JSON.stringify(singlePlaceMock))
//     const response = await request(app)
//       .post('/attractions')
//       .send(["Heathrow Airport"])
//     // expect(fetch.mock.calls.length).toEqual(1);
//     expect(response.body[0].name).toBe("Edinburgh Castle");
//   });




  
  // test('When given four string locations it should return an array of four objects with coordinates', async () => {
  //   let response = await request(app)
  //     .post('/attractions')
  //     .send(["Makers Academy", "London Eye", "Le Wagon", "Tower Bridge"])
  //   expect(response.body[0].prominentAttraction.name).toEqual("All Hallows-On-The Wall")
  //   expect(response.body[1].prominentAttraction.name).toEqual("Old War Office Building")
  //   expect(response.body[2].prominentAttraction.name).toEqual("Hackney City Farm")
  //   expect(response.body[3].prominentAttraction.name).toEqual("Butler's Wharf Pier.")
  // });
// });
  
