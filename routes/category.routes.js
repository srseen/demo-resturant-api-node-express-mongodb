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

// Import auth middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Import admin middleware
const adminMiddleware = require("../middlewares/admin.middleware");

// Category routes
router.get("/", authMiddleware, getCategoryAll);
router.get("/:id", authMiddleware, getCategoryById);
router.post("/", authMiddleware, adminMiddleware, createCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

// Export the router
module.exports = router;
