const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Purchase = require("../models/purchase");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a user by ID
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email); // Log login attempt

  try {
    if (!email || !password) {
      console.log("Missing email or password"); // Log missing fields
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found with email:", email); // Log user not found
      return res.status(404).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      console.log("Incorrect password for email:", email); // Log incorrect password
      return res.status(404).json({ message: "Invalid email or password" });
    }

    console.log("User authenticated:", user); // Log successful authentication
    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Error during login:", err); // Log error
    res.status(500).json({ message: err.message });
  }
});

// Create a user
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
