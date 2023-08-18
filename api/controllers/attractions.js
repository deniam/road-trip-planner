const { getLocationCoordinates, getAttractionDetails } = require('../../api/services/googlemapsapi');

const AttractionsController = {
  
  GetAttractions: async (req, res) => {

    try {
      const listOfLocations = Array.from(req.body)
      if (listOfLocations.length === 0) {
        return res.status(400).json({ message: 'No locations provided' });
      }

      let listOfCoordinates = await getLocationCoordinates(listOfLocations)
      let listOfAttractions = await getAttractionDetails(listOfCoordinates)
      listOfAttractions = [].concat(...listOfAttractions);  //This flattens the array 
      
      res.status(201).json(listOfAttractions);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = AttractionsController;




