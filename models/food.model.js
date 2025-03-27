// Initialize mongoose
const mongoose = require("mongoose");

// Define the food schema
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Food category is required"],
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2771/2771401.png",
    },
  },
  { timestamps: true }
);

// Create the food model
const Food = mongoose.model("Food", foodSchema);

// Export the food model
module.exports = Food;
