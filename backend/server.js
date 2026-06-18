require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");

// Config import
const connectDB = require("./config/mongodb");
const cookieParser = require("cookie-parser");

// Routes Imports
const userRouter = require("./routes/userRouter");
const itineraryRouter = require("./routes/itineraryRouter");
const { json } = require("stream/consumers");

// App config
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/itinerary", itineraryRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

// Server listen
server.listen(port, () => console.log(`Server running  on port: ${port}`));
