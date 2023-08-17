const express = require("express");
const router = express.Router();

const TripsController = require("../controllers/trips");

router.post("/", TripsController.Add);

module.exports = router;