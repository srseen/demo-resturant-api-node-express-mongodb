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

// Import admin middleware
const adminMiddleware = require("../middlewares/admin.middleware");

// Food routes
router.get("/", authMiddleware, getFoodAll);
router.get("/:id", authMiddleware, getFoodById);
router.post("/", authMiddleware, adminMiddleware, createFood);
router.put("/:id", authMiddleware, adminMiddleware, updateFood);
router.delete("/:id", authMiddleware, adminMiddleware, deleteFood);

// Export router
module.exports = router;
