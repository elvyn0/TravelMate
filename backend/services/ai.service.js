const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const generateItinerary = async (text) => {
  const prompt = `
You are a travel document analysis assistant.

Analyze the travel documents text below.

Tasks:

1. Extract travel booking information.
2. Generate a detailed travel itinerary.

Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanations.
- Use empty strings when information is missing.
- Infer reasonable itinerary structure from the booking information.

Travel Document Text:

${text}

Expected JSON format:

{
  "title": "",
  "extractedData": {
    "travelerName": "",
    "from": "",
    "to": "",
    "departureDate": "",
    "returnDate": "",
    "hotel": "",
    "airline": "",
    "bookingReference": ""
  },
  "days": [
    {
      "day": 1,
      "date": "",
      "activities": []
    }
  ]
}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
  });

  const content = response?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No response received from AI");
  }

  return content;
};

module.exports = {
  generateItinerary,
};
