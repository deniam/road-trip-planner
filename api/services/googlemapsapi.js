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
    let nearbyAttractions = await Promise.all(listOfCoordinates.map(async (coordinates) => {
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

  

module.exports = { getLocationCoordinates, getAttractionDetails}