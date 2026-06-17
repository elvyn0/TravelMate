const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const extractBookingData = async (text) => {
  const prompt = `
    Extract travel booking details from the text below.

    Return ONLY valid JSON.

    Text: ${text}

    Expected format:

    {
    "from":"",
    "to":"",
    "departureDate":"",
    "hotel":"",
    "travelerName":""
    }

    `;
  const result = await model.generateContent(prompt);

  return result.response.text();
};

const generateItinerary = async (bookingData) => {
  const prompt = `
        Using this booking information: 

        ${JSON.stringify(extractedData)}

        Generate  a detailed travel itinerary.

        Return JSON only.

        {
        "title":"",
        "days":[]
        }
        `;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = { extractBookingData, generateItinerary };
