const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `The Database connected successfully. on host ==> ${mongoose.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`${error}`.bgRed.white);
  }
};

module.exports = connectDB;
