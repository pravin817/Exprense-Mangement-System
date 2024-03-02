const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

// rest object
const app = express();

// configure the dotenv
dotenv.config();

// configure the MongoDB Connection
connectDB();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.send("The server is running");
});

// Get the PORT
const PORT = process.env.PORT || 8080;

// Listen server
app.listen(PORT, () => {
  console.log(
    `The server is running in ${process.env.NODE_MODE} on port : ${PORT}`
      .bgGreen.white
  );
});
