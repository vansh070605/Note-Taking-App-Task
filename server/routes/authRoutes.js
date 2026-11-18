
const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  logout,
  getMe,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.get("/me", authMiddleware, getMe);

module.exports = router;
