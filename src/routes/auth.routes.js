const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// public routes
router.post("/register", register);
router.post("/login", login);

// protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Profile accessed",
    user: req.user,
  });
});

// admin route
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;