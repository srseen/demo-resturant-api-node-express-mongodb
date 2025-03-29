// Init the express router
const express = require("express");
const router = express.Router();

// Import category controller
const {
  getCategoryAll,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

// Category routes
router.get("/", getCategoryAll);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Export the router
module.exports = router;
