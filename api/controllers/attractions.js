const fetch = require("node-fetch");
const API_KEY = 'AIzaSyBTiJKEAP4neyFSf3XgmgI4qrlDN3DPXow';


const AttractionsController = {
  
  GetAttractions: async (req, res) => {

    try {
      let locationsCoordinates = []
      const locations = Array.from(req.body)

      for (const location of locations) {
        const getCoordinate = await getLocationCoordinates(location);
        const label = `${location}`;
        locationsCoordinates.push({[label]: getCoordinate})
      }

      res.status(201).json(locationsCoordinates);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

async function getLocationCoordinates(location) {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=${API_KEY}`);
    const data = await response.json();

    const results = data.results;
    if (results.length > 0) {
      const coordinates = results[0].geometry.location;
      return { latitude: coordinates.lat, longitude: coordinates.lng };
    } else {
      throw new Error('Location not found.');
    }
  } catch (error) {
    throw new Error('Error fetching location coordinates.');
  }
}







module.exports = AttractionsController;




