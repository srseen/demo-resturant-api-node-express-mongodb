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

// Import auth middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Food routes
router.get("/", authMiddleware, getFoodAll);
router.get("/:id", authMiddleware, getFoodById);
router.post("/", authMiddleware, createFood);
router.put("/:id", authMiddleware, updateFood);
router.delete("/:id", authMiddleware, deleteFood);

// Export router
module.exports = router;
