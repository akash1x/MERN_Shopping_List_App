if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Item Model
const User = require("../../models/User");

router.post("/", async (req, res) => {
  // Getting data from the form
  const { name, email, password } = req.body;

  console.log(name);
  console.log(password);
  console.log(email);
  //Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please Enter all fields" }); // 400: Bad request ie user did not send the correct info
  }

  //Check Existing user
  try {
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: "User already exist" });
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });

    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;

    const userSaved = await newUser.save();
    const token = await jwt.sign({ id: userSaved.id }, process.env.jwtSecret, {
      expiresIn: 3600,
    });

    return res.json({
      token: token,
      user: {
        id: userSaved.id,
        name: userSaved.name,
        email: userSaved.email,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
