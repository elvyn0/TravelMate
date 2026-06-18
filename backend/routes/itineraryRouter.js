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

itineraryRouter.post("/", userAuth, upload.array("documents", 10), createItinerary);
itineraryRouter.get("/get/:id", userAuth, getItineraryById);
itineraryRouter.get("/list", userAuth, getUserItinerary);
itineraryRouter.get("/shared/:shareId", getSharedItinerary);
itineraryRouter.post("/share/:id", generateShareLink);
itineraryRouter.delete("/delete/:id", userAuth, deleteItinerary);

module.exports = itineraryRouter;
