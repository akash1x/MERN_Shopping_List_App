if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Item Model
const User = require("../../models/User");

// Path : /api/auth
// For Authentications
router.post("/", async (req, res) => {
  // Getting data from the form
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please Enter all fields" }); // 400: Bad request i.e. user did not send the correct info
  }

  // Check existing user
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = await jwt.sign({ id: user.id }, process.env.jwtSecret, {
      expiresIn: 3600,
    });

    return res.json({
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Path : /api/auth/user
router.get("/user", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;
