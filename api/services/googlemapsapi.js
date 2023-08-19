const fetch = require("node-fetch");
require('dotenv').config()
const API_KEY = process.env.API_KEY;

async function getLocationCoordinates(listOfLocations) {
  try {
    let listOfCoordinates = await Promise.all(listOfLocations.map(async (location) => {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=${API_KEY}`);
      const data = await response.json();
      const results = data.results;
      if (results.length > 0) {
        const coordinates = results[0].geometry.location;
        return [coordinates.lat,coordinates.lng];
      } else {
        return null
      }
    }));
    listOfCoordinates = listOfCoordinates.filter(coordinates => coordinates !== null);
    return listOfCoordinates
    } catch (error) {
      throw new Error('Error fetching location coordinates.');
    }
  }
  

  async function getAttractionDetails(listOfCoordinates) {
    try {
      const nearbyAttractions = await Promise.all(listOfCoordinates.map(async (coordinates) => {
          const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates[0]}%2C${coordinates[1]}&radius=10000&type=tourist_attraction&key=${API_KEY}`);
          const data = await response.json();
          
          let results = data.results.slice(0, 5)
          
          if (results.length > 0) {
            return results;
          } else {
            throw new Error('Location not found.');
          }
        }));
      return nearbyAttractions
    } catch (error) {
      throw new Error('Error fetching attractions.');
    }
  }

  function removeDuplicateLocations(listOfLocationsArrays) {
    //turn into one long array rather than array of arrays
    const flattenedArray = [].concat(...listOfLocationsArrays);
    return flattenedArray.filter(
      (obj, index) =>
      flattenedArray.findIndex((item) => item.place_id === obj.place_id) === index
    );
  }

  function orderLocationsByDistance(startCoordinates, locations) {
    
    function distanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
      const r = 6371; // km
      const p = Math.PI / 180;
      

      const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                    + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                      (1 - Math.cos((lon2 - lon1) * p)) / 2;
    
      return 2 * r * Math.asin(Math.sqrt(a));
    }
    if (startCoordinates.length == 0 || locations.length == 0){
      return [];
    }
    let sortedLocations  = [...locations]

    return sortedLocations.sort((a, b) => {
      const distanceA = distanceBetweenCoordinates(startCoordinates[0], startCoordinates[1], a.geometry.location.lat, a.geometry.location.lng);
      const distanceB = distanceBetweenCoordinates(startCoordinates[0], startCoordinates[1], b.geometry.location.lat, b.geometry.location.lng);
      return distanceA - distanceB;
    });

  }

  

  

module.exports = { getLocationCoordinates, getAttractionDetails, removeDuplicateLocations, orderLocationsByDistance}