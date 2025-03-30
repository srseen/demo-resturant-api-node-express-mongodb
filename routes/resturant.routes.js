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

// Import admin middleware
const adminMiddleware = require("../middlewares/admin.middleware");

// Resturant routes
router.get("/", authMiddleware, getResturantAll);
router.get("/:id", authMiddleware, getResturantById);
router.post("/", authMiddleware, adminMiddleware, createResturant);
router.put("/:id", authMiddleware, adminMiddleware, updateResturant);
router.delete("/:id", authMiddleware, adminMiddleware, deleteResturant);

// Export router
module.exports = router;
