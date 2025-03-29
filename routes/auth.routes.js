// Init router
const express = require("express");
const router = express.Router();

// Import auth controller
const { register, login, logout } = require("../controllers/auth.controller");

// Define routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// Export router
module.exports = router;
