const fetchMock = require("jest-fetch-mock");
fetchMock.enableMocks();
require('../mongodb_helper');
const { getLocationCoordinates, getAttractionDetails } = require('../../../api/services/googlemapsapi');

describe('getLocationCoordinates method', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  
  test('getLocationCoordinates method gets coordinates from user input containing one string', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      results: [{
        geometry: {
          location: {
            lat: 55.9485947,
            lng: -3.1999135
          }
        }
      }]
    }));

    const coordinates = await getLocationCoordinates(["Edinburgh Castle"]);
    expect(coordinates[0]).toEqual([55.9485947, -3.1999135]);
  });

  test('getLocationCoordinates method gets coordinates from user input containing two strings', async () => {
    fetchMock.mockResponses(
      JSON.stringify({
        results: [{
          geometry: {
            location: {
              lat: 55.9485947,
              lng: -3.1999135
            }
          }
        }]
      }),
      JSON.stringify({
        results: [{
          geometry: {
            location: {
              lat: 51.5234156,
              lng: -0.08354919999999999
            }
          }
        }]
      })
    );

    const coordinates = await getLocationCoordinates(["Edinburgh Castle", "Makers Academy"]);
    expect(coordinates[0]).toEqual([55.9485947, -3.1999135]);
    expect(coordinates[1]).toEqual([51.5234156, -0.08354919999999999]);
  });


  test('getLocationCoordinates method returns error if no location found', async () => {
    fetchMock.mockResponses(
      JSON.stringify({
        results: [{
          geometry: {
            location: {
              lat: 55.9485947,
              lng: -3.1999135
            }
          }
        }]
      }),
      JSON.stringify({
        results: []
      })
    );

    const coordinates = await getLocationCoordinates(["Edinburgh Castle", "Very Fake Location"]);
    expect(coordinates[0]).toEqual([55.9485947, -3.1999135]);
    expect(coordinates.length).toBe(1);
  });
});


describe('getAttractionDetails method', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('getAttractionDetails method gets list of 5 attractions from one list of coordinates', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      results: [
        {name: "Edinburgh Castle"},
        {name: "Scottish Parliament Building"},
        {name: "Scottish Parliament Building"},
        {name: "Scottish Parliament Building"},
        {name: "Scottish Parliament Building"}
      ]
    }));

    const attractions = await getAttractionDetails([[55.9485947, -3.1999135]]);
    expect(attractions.length).toBe(1);
    expect(attractions[0].length).toBe(5);
    expect(attractions[0][0].name).toEqual("Edinburgh Castle");
    expect(attractions[0][1].name).toEqual("Scottish Parliament Building");
  });

  test('getAttractionDetails method gets list of 5 attractions each from two lists of coordinates', async () => {
    fetchMock.mockResponses(
      JSON.stringify({
        results: [
          {name: "Edinburgh Castle"},
          {name: "Scottish Parliament Building"},
          {name: "Scottish Parliament Building"},
          {name: "Scottish Parliament Building"},
          {name: "Scottish Parliament Building"}
        ]
      }),
      JSON.stringify({
        results: [
          {name: "All Hallows-On-The Wall"},
          {name: "Barbican Centre"},
          {name: "Barbican Centre"},
          {name: "Barbican Centre"},
          {name: "Barbican Centre"}
        ]
      })
    );

    const attractions = await getAttractionDetails([
      [55.9485947, -3.1999135],
      [51.5234156, -0.08354919999999999]
    ]);
    expect(attractions.length).toBe(2);
    expect(attractions[0].length).toBe(5);
    expect(attractions[1].length).toBe(5);
    expect(attractions[0][0].name).toEqual("Edinburgh Castle");
    expect(attractions[0][1].name).toEqual("Scottish Parliament Building");
    expect(attractions[1][0].name).toEqual("All Hallows-On-The Wall");
    expect(attractions[1][1].name).toEqual("Barbican Centre");
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
  
