require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/mongodb");
const cookieParser = require("cookie-parser");

// Routes Imports
const userRouter = require("./routes/userRouter");
const itineraryRouter = require("./routes/itineraryRouter");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
connectDB();

const corsOptions = {
  origin: "https://travel-mate-khaki.vercel.app/" || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/itinerary", itineraryRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

server.listen(port, () => console.log(`Server running on port: ${port}`));
