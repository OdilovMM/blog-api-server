const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticated");

// Endpoint

router.post("/register", authController.register);
router.get("/verification/:userId", authController.verification);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refreshToken", authController.refreshToken);
router.get("/get-user", authenticate, authController.getUsers);

module.exports = router;
