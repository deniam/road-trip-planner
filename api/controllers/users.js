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

  GetTrips: (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { user_id: user_Id } = TokenGenerator.verify(token);
    
    User.findById(user_Id, (err, user) => {
        if (err) {
            res.status(400).json({message: 'Bad request'})
        } else {
            const token = TokenGenerator.jsonwebtoken(user_Id)
            if (!user) {
              res.status(400).json({message: 'Bad request'})
            } else {
              const { username, trips } = user;
            res.status(201).json({token: token, message: 'OK', username:username, trips: trips });
            }
        }
    }).lean();
},
};



module.exports = UsersController;
