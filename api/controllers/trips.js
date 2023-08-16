const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator")

const TripsController = {
    Add: (req, res) => {
        const token = req.headers.authorization.replace("Bearer ", "");
        const { user_id: user_Id } = TokenGenerator.verify(token);
        const trip = {tripName: req.body.tripName, startLocation: req.body.startLocation, endLocation: req.body.endLocation, attractions: req.body.attractions}
        if (trip.tripName == null || trip.startLocation == null || trip.endLocation == null || trip.attractions == null) {
            throw err;
        }
        User.findByIdAndUpdate(user_Id, {$push: {trips: trip}}, (err) => {
            if (err) {
                throw err;
            } else {
                const token = TokenGenerator.jsonwebtoken(user_Id)
                res.status(201).json({token: token, message: 'OK'});
            }
        });
    },
};

module.exports = TripsController;