const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Endpoint

router.post("/register", authController.register);
router.get("/verification/:userId", authController.verification);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
