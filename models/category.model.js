// Initialize mongoose
const mongoose = require("mongoose");

// Define the category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
    },
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: [true, "Category menu is required"],
    },
  },
  { timestamps: true }
);

// Create the category model
const Category = mongoose.model("Category", categorySchema);

// Export the category model
module.exports = Category;
