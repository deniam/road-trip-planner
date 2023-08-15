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
};

module.exports = UsersController;
