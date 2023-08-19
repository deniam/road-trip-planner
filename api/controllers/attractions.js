const TokenGenerator = require("../lib/token_generator")
const { getLocationCoordinates, getAttractionDetails, removeDuplicateLocations, orderLocationsByDistance} = require('../services/googlemapsapi');

const AttractionsController = {
  
  GetAttractions: async (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { user_id: user_Id } = TokenGenerator.verify(token);
    try {
      const listOfLocations = Array.from(req.body.locations);
      if (listOfLocations.length === 0) {
        return res.status(400).json({ message: 'No locations provided' });
      }

      let listOfCoordinates = await getLocationCoordinates(listOfLocations);
      let listOfAttractions = await getAttractionDetails(listOfCoordinates)
      const finalListOfAttractions = orderLocationsByDistance(listOfCoordinates[0],removeDuplicateLocations(listOfAttractions));
      const token = TokenGenerator.jsonwebtoken(user_Id)
      
      res.status(201).json({token: token, message: 'OK', attractions:finalListOfAttractions });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = AttractionsController;




