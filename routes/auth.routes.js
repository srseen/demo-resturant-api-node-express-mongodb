// Init router
const express = require("express");
const router = express.Router();

// Import auth controller
const authController = require("../controllers/auth.controller");

// Define routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Export router
module.exports = router;
