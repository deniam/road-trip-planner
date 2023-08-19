const express = require("express");
const router = express.Router();
const AttractionsController = require("../controllers/attractions");
const tokenChecker = require("../middleware/TokenChecker");

router.post("/", tokenChecker, AttractionsController.GetAttractions);

module.exports = router;
