const fetch = require("node-fetch");
const API_KEY = 'AIzaSyBTiJKEAP4neyFSf3XgmgI4qrlDN3DPXow';


const AttractionsController = {
  
  GetAttractions: async (req, res) => {

    try {
      let coordinatesWithLabels = []
      let coordinatesWithoutLabels = []
      const locations = Array.from(req.body)

      // This takes search strings and returns coordinates of first matching result
      for (const location of locations) {
        const getCoordinate = await getLocationCoordinates(location);
        coordinatesWithoutLabels.push(getCoordinate)
        const label = `${location}`;
        coordinatesWithLabels.push({ [label]: getCoordinate })
      }

      // This gets nearby attractions using coordinates 
      const listOfNearbyAttractions = [];
      for (const coordinateWithoutLabel of coordinatesWithoutLabels) {
        const nearbyAttraction = await getAttractionDetails(coordinateWithoutLabel);
        listOfNearbyAttractions.push({
   
          prominentAttraction: nearbyAttraction.results[0]
        });
      }

      // console.log("LISTNEARBYATTRACTIONS",listOfNearbyAttractions)

      res.status(201).json(coordinatesWithLabels);
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


async function getAttractionDetails(coordinates) {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.latitude}%2C${coordinates.longitude}&radius=1500&type=tourist_attraction&key=${API_KEY}`);
    const data = await response.json();

    const results = data.results
    if (results.length > 0) {
      return {results};
    } else {
      throw new Error('Location not found.');
    }
  } catch (error) {
    throw new Error('Error fetching attraction.');
  }
}





module.exports = AttractionsController;




