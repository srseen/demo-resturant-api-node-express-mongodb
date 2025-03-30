// Init router
const express = require("express");
const router = express.Router();

// Import resturant controller
const {
  getResturantAll,
  getResturantById,
  createResturant,
  updateResturant,
  deleteResturant,
} = require("../controllers/resturant.controller");

// Import auth middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Resturant routes
router.get("/", authMiddleware, getResturantAll);
router.get("/:id", authMiddleware, getResturantById);
router.post("/", authMiddleware, createResturant);
router.put("/:id", authMiddleware, updateResturant);
router.delete("/:id", authMiddleware, deleteResturant);

// Export router
module.exports = router;
