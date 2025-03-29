// Init router
const express = require("express");
const router = express.Router();

// Import food controller
const {
  getFoodAll,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/food.controller");

// Food routes
router.get("/", getFoodAll);
router.get("/:id", getFoodById);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

// Export router
module.exports = router;
