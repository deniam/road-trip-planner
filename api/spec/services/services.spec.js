const fetchMock = require("jest-fetch-mock");
fetchMock.enableMocks();
require('../mongodb_helper');
const { getLocationCoordinates, getAttractionDetails, removeDuplicateLocations, orderLocationsByDistance} = require('../../../api/services/googlemapsapi');
const singlePlaceMock = require ('../../mocks/singlePlaceMock')

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

describe('removeDuplicateLocations function', () => {
    describe('returns an array of locations that do not include duplicates', () => {
        test('when passed an array of arrays of locations', () => {
            const arrayOfSinglePlaceMocks = [];
            //create array of arrays to simuluate output of getAttractionDetails
            for (let i =0; i < 3; i++) {
                arrayOfSinglePlaceMocks.push(singlePlaceMock);
            }
            
            const filteredLocations = removeDuplicateLocations(arrayOfSinglePlaceMocks);
            expect(filteredLocations).toEqual(singlePlaceMock);
        });
        describe('returns empty array', () => {
            test('when passed an empty array', () => {
                const filteredLocations = removeDuplicateLocations([]);
                expect(filteredLocations).toEqual([]);
            });
        });
    })

})

describe('orderLocationsByDistance function', () => {
    describe('returns an array of locations in distance from start location order', () => {
        test('when passed an array of locations', () => {   
            //use 55.966045330131514, -3.133149854573019 for start location        
            const orderedLocations = orderLocationsByDistance([55.966045330131514, -3.133149854573019],singlePlaceMock);
            expect(orderedLocations).toEqual([singlePlaceMock[1], singlePlaceMock[3], singlePlaceMock[2],singlePlaceMock[4], singlePlaceMock[0] ]);
        });
    })
    describe('returns empty array', () => {
        test('when passed an empty array with coordinates', () => {
            const orderedLocations = orderLocationsByDistance([55.9485947, -3.1999135],[]);
            expect(orderedLocations).toEqual([]);
        });
        test('when passed an array without coordinates', () => {
            const orderedLocations = orderLocationsByDistance([],singlePlaceMock);
        expect(orderedLocations).toEqual([]);
        });
    });    
})