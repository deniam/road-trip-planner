const API_KEY = 'AIzaSyBTiJKEAP4neyFSf3XgmgI4qrlDN3DPXow';
const location = "Makers Academy"

const AttractionsController = {
  GetAttractions: async (req, res) => {
    try {
      fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cgeometry&input=${location}&inputtype=textquery&key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          return res.status(201).json(data.candidates[0])
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching location data' });
    }
  }
}

module.exports = AttractionsController;



