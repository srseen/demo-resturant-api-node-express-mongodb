// Init router
const express = require("express");
const router = express.Router();

// Import food controller
const foodController = require("../controllers/food.controller");

// Food routes
router.get("/", foodController.getAll);
router.get("/:id", foodController.getById);
router.get("/search/:name", foodController.search);
router.post("/", foodController.create);
router.put("/:id", foodController.update);
router.delete("/:id", foodController.delete);

// Export router
module.exports = router;
