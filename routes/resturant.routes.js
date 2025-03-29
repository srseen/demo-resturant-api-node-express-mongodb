// Init router
const express = require("express");
const router = express.Router();

// Import resturant controller
const resturantController = require("../controllers/resturant.controller");

// Resturant routes
router.get("/", resturantController.getAll);
router.get("/:id", resturantController.getById);
router.get("/search/:name", resturantController.searchByName);
router.post("/", resturantController.create);
router.put("/:id", resturantController.update);
router.delete("/:id", resturantController.delete);

// Export router
module.exports = router;
