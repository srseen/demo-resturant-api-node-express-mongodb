// Init the express router
const express = require("express");
const router = express.Router();

// Import category controller
const categoryController = require("../controllers/category.controller");

// Category routes
router.get("/", categoryController.getCategoryAll);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

// Export the router
module.exports = router;
