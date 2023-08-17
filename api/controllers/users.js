const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator")

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        const token = TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({token: token, message: 'OK'});
      }
    });
  },

  GetTrips: async (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { user_id: user_Id } = TokenGenerator.verify(token);
    
    const user = await User.findById(user_Id, (err) => {
        if (err) {
            throw err;
        } else {
            const token = TokenGenerator.jsonwebtoken(user_Id)
            res.status(201).json({token: token, message: 'OK', username:user.username, trips: user.trips });
        }
    });
},
};



module.exports = UsersController;
