const { getLocationCoordinates, getAttractionDetails } = require('../../api/services/googlemapsapi');

const AttractionsController = {
  
  GetAttractions: async (req, res) => {

    try {
      const locations = Array.from(req.body)
      if (locations.length === 0) {
        return res.status(400).json({ message: 'No locations provided' });
      }

      let listOfAttractions = await Promise.all(locations.map(async (location) => {
        const getCoordinate = await getLocationCoordinates(location); // First API call (Near by Search Api)
        const nearbyAttraction = await getAttractionDetails(getCoordinate); // Second API call (Nearby Attractions Api)
        return nearbyAttraction.results
      }));

      listOfAttractions = [].concat(...listOfAttractions);  //This flattens the array 
      
      res.status(201).json(listOfAttractions);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = AttractionsController;




