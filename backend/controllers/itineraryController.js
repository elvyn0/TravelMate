const Itinerary = require("../models/Itinerary");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const crypto = require("crypto");
const { generateItinerary } = require("../services/ai.service");

// Create itinerary
const createItinerary = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one file",
      });
    }

    let extractedText = "";

    for (const file of files) {
      if (file.mimetype === "application/pdf") {
        const pdfData = await pdfParse(file.buffer);

        extractedText += pdfData.text + "\n";
      } else if (file.mimetype.startsWith("image/")) {
        const result = await Tesseract.recognize(file.buffer, "eng");

        extractedText += result.data.text + "\n";
      }
    }

    if (!extractedText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from uploaded files",
      });
    }

    const aiResponse = await generateItinerary(extractedText);

    const cleanedResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const itineraryData = JSON.parse(cleanedResponse);

    // creating and saving generated data in DB
    const newItinerary = await Itinerary.create({
      userId: req.user._id,
      title: itineraryData.title || "Untitled Trip",
      extractedData: itineraryData.extractedData || {},
      itinerary: itineraryData,

      shareId: crypto.randomUUID(),

      uploadedFiles: files.map((file) => ({
        fileName: file.originalname,
        fileType: file.mimetype,
      })),
    });

    return res.status(201).json({
      success: true,
      itineraryId: newItinerary._id,
    });
  } catch (error) {
    console.error("Itinerary Creation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createItinerary,
};

// Get user itinerary
const getUserItinerary = async (req, res) => {
  try {
    const userId = req.user._id;

    const itineraries = await Itinerary.find({
      userId,
    }).sort({ createdAt: -1 });

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
      return res.status(404).json({ success: false, message: "Itinerary not found" });
    }

    // Verify ownership
    if (itinerary.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to view this itinerary" });
    }

    res.status(200).json({ success: true, itinerary });
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete itinerary
const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

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
const generateShareLink = async (req, res) => {
  try {
    const { id } = req.params;

    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ success: false, message: "itinerary not found" });
    }

    // generate shareId
    if (!itinerary.shareId) {
      itinerary.shareId = crypto.randomUUID();
    }

    itinerary.isPublic = true;

    await itinerary.save();

    res.status(200).json({ success: true, shareUrl: `/share/${itinerary.shareId}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get shared itinerary
const getSharedItinerary = async (req, res) => {
  try {
    const { shareId } = req.params;
    const itinerary = await Itinerary.findOne({ shareId });

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
