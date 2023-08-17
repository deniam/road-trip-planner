const fetch = require("node-fetch");
// const API_KEY = process.env.API_KEY;
// require('dotenv').config()

const API_KEY = 'AIzaSyBTiJKEAP4neyFSf3XgmgI4qrlDN3DPXow'


async function getLocationCoordinates(location) {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=${API_KEY}`);
      const data = await response.json();
      
      const results = data.results;
      if (results.length > 0) {
        const coordinates = results[0].geometry.location;
        return [coordinates.lat,coordinates.lng];
      } else {
        throw new Error('Location not found.');
      }
    } catch (error) {
      throw new Error('Error fetching location coordinates.');
    }
  }
  
  async function getAttractionDetails(coordinates) {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates[0]}%2C${coordinates[1]}&radius=5000&type=tourist_attraction&key=${API_KEY}`);
      const data = await response.json();
      
      let results = data.results.slice(0, 5)
      if (results.length > 0) {
        return { results };
      } else {
        throw new Error('Location not found.');
      }
    } catch (error) {
      throw new Error('Error fetching attraction.');
    }
  };
  

//   module.exports = { getLocationCoordinates, getAttractionDetails}
  module.exports = getLocationCoordinates