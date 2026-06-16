require("dotenv").config();
const express = require("express");
const http = require("http");

// Config import
const connectDB = require("./config/mongodb");

// Routes Imports
const userRouter = require("./routes/userRouter");
const itineraryRouter = require("./routes/itineraryRouter");

// App config
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const port = process.env.PORT || 4000;
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/itinerary", itineraryRouter);

// Server listen
server.listen(port, () => console.log(`Server running  on port: ${port}`));
