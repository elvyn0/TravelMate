const express = require("express");
const userAuth = require("../middleware/userAuth");
const upload = require("../middleware/uploadMiddleware");
const {
  createItinerary,
  getItineraryById,
  getUserItinerary,
  deleteItinerary,
  getSharedItinerary,
  generateShareLink,
} = require("../controllers/itineraryController");

const itineraryRouter = express.Router();

itineraryRouter.post("/", userAuth, upload.array("documents", 5), createItinerary);
itineraryRouter.get("/get/:id", getItineraryById);
itineraryRouter.get("/get/user", getUserItinerary);
itineraryRouter.get("/shared", getSharedItinerary);
itineraryRouter.post("/share/:id", generateShareLink);
itineraryRouter.delete("/delete/:id", deleteItinerary);

module.exports = itineraryRouter;
