// Init the express router
const express = require("express");
const router = express.Router();

// Import category controller
const categoryController = require("../controllers/category.controller");

// Category routes
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.get("/search/:name", categoryController.search);
router.post("/", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

// Export the router
module.exports = router;
