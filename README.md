# TravelMate AI

TravelMate AI is a MERN-stack web application that helps travelers generate AI-powered travel itineraries from booking documents such as flight tickets, hotel reservations, and travel confirmations.

## Features

- User Authentication (JWT)
- Upload travel booking documents (PDF/Image)
- Extract travel information from uploaded files
- AI-powered itinerary generation
- Save itineraries to MongoDB
- View itinerary history
- Share generated itineraries
- Responsive React frontend

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)

### AI Integration

- Google Gemini API / OpenAI API

## Project Structure

travelmate/
├── client/
├── server/
└── README.md

## Installation

### Clone Repository

git clone <repository-url>

### Frontend

cd client
npm install
npm run dev

### Backend

cd server
npm install
npm run dev

## Environment Variables

Create a .env file inside the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_api_key

## Development Status

Project is currently under development as part of a Full Stack Developer technical assignment.

## Author

Anoop
