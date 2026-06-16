const { text } = require("express");
const Itinerary = require("../models/Itinerary");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const { extractBookingData, generateItinerary } = require("../services/ai.service");

// Create itinerary
const createItinerary = async (req, res) => {
  try {
    const files = req.files;

    // Priventing empty files
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload at least one file" });
    }

    // Extrating Data form files
    let extractedText = "";

    for (const file of files) {
      if (file.mimetype === "application/pdf") {
        const data = await pdfParse(file.buffer);

        extractedText += data.text + "\n";
      } else if (file.mimetype.startsWith("image/")) {
        const result = await Tesseract.recognize(file.buffer, "eng");

        extractedText += result.data.text + "\n";
      }
    }

    // Extracting booking deatiles fromt the extracted text
    const bookingResponse = await extractBookingData(extractedText);

    const extractedData = JSON.parse(bookingResponse);

    // Generating itinerary from ai modle
    const itineraryResponse = await generateItinerary(extractedData);

    const itinerary = JSON.parse(itineraryResponse);

    // Saving itinerary to model db
    const newItinerary = await Itinerary.create({
      userId: req.user._id,
      title: itinerary.title,
      extractedData,
      itinerary,
      uploadedFiles: files.map((file) => ({
        fileName: file.originalname,
        fileType: file.mimetype,
      })),
    });

    res.status(200).json({ success: true, itinerary: newItinerary });
  } catch (error) {
    console.error("itinerary Creation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user itinerary
const getUserItinerary = async (req, res) => {
  try {
    const userId = req.user._id;

    const itineraries = await Itinerary.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, itineraries });
  } catch (error) {
    console.error("Get Itineraries Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get itinerary by id
const getItineraryById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ success: false, message: "itinerary not found" });
    }

    if (itinerary.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    res.status(200).json({ success: true, itinerary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete itinerary
const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ success: false, message: "Itinereray not found" });
    }

    if (itinerary.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not autorized to delete" });
    }

    await Itinerary.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Itinerary Deleted" });
  } catch (error) {
    console.error("Delete Itinerary Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Shared itinerary
const getSharedItinerary = async (req, res) => {
  try {
    const { userId } = req.params.id;

    const itinerary = await Itinerary.findById(userId);

    if (!itinerary) {
      return res.status(404).json({ success: false, message: "itinerary not found" });
    }

    itinerary.shareId = crypto.randomUUID();
    itinerary.isPublic = true;

    await itinerary.save();

    res.json({ shareUrl: `/share/${itinerary.shareId}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generate share link
const generateShareLink = async (req, res) => {
  try {
    const { shareId } = req.params.shareId;

    const itinerary = await Itinerary.findOne(shareId);

    if (!itinerary) {
      return res.status(404).json({ success: false, message: "Shared itinerary not found" });
    }

    res.status(200).json({ success: true, itinerary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createItinerary,
  getItineraryById,
  getUserItinerary,
  deleteItinerary,
  getSharedItinerary,
  generateShareLink,
};
