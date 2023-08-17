const jestFetchMock = require("jest-fetch-mock");
// import fetchMock from "jest-fetch-mock";
// fetchMock.enableMocks();
const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');
const getLocationCoordinates = require('../../../api/services/googlemapsapi');
const singlePlaceMock = require('../../mocks/singlePlaceMock')

describe('getLocationCoordinates method', () => {
  test('getLocationCoordinates method gets coordinates from user input containing one string', async () => {
    const coordinates = await getLocationCoordinates("Edinburgh Castle")
    expect(coordinates[0]).toBe(55.9485947)
    expect(coordinates[1]).toBe(-3.1999135)
  })

  test('getLocationCoordinates method gets coordinates from user input containing two string', async () => {
    const coordinates = await getLocationCoordinates(["Edinburgh Castle", "Makers Academy"])
    console.log("--------",coordinates)
    expect(coordinates[0]).toBe(55.9485947)
    expect(coordinates[1]).toBe(-3.1999135)
  })
})

















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
//     // console.log("FETCH MOCK CALLS:", fetch.mock.calls)
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
  
