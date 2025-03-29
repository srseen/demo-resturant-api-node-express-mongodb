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

// Resturant routes
router.get("/", getResturantAll);
router.get("/:id", getResturantById);
router.post("/", createResturant);
router.put("/:id", updateResturant);
router.delete("/:id", deleteResturant);

// Export router
module.exports = router;
