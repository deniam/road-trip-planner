const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/TokenChecker");
const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/trips", tokenChecker, UsersController.GetTrips);

module.exports = router;
