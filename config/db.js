// Importing the mongoose module
const mongoose = require("mongoose");

// Function to connect to the database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Database ${mongoose.connection.host} `.white.bgBlue
    );
  } catch (error) {
    console.log("Connection Failed".white.bgRed);
    console.log(error);
  }
};

// Exporting the connectDb function
module.exports = connectDb;
