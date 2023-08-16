const express = require("express");
const router = express.Router();
const AttractionsController = require("../controllers/attractions");

router.post("/", AttractionsController.GetAttractions);

module.exports = router;
