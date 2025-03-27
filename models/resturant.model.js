// Initialize mongoose
const mongoose = require("mongoose");

// Define the resturant schema
const resturantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Resturant name is required"],
    },
    description: {
      type: String,
      required: [true, "Resturant description is required"],
    },
    location: {
      latitude: { type: String },
      longitude: { type: String },
      address: {
        type: String,
        required: [true, "Resturant address is required"],
      },
      city: { type: String, required: [true, "Resturant city is required"] },
      country: {
        type: String,
        required: [true, "Resturant country is required"],
      },
    },
    rating: {
      type: Number,
      required: [true, "Resturant rating is required"],
      default: 0,
      min: 0,
      max: 5,
    },
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: [true, "Resturant menu is required"],
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/9638/9638472.png",
    },
  },
  { timestamps: true }
);

// Create the resturant model
const Resturant = mongoose.model("Resturant", resturantSchema);

// Export the resturant model
module.exports = Resturant;
