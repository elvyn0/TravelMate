const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    extractedData: { type: Object, required: true },
    itinerary: { type: Object, required: true },
    uploadedFiles: [
      {
        fileName: String,
        fileUrl: String,
        fileType: String,
      },
    ],
    shareId: { type: String, unique: true, sparse: true },
    isPublic: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["Processing", "Completed", "failed"],
      default: "Completed",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
