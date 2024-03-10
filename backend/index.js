//index.js

const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = generateUniqueSalt();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const User = require("./models/User");
const crypto = require("crypto");

app.use(express.json());

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/booking-guesthouse-app");

function generateUniqueSalt() {
  return crypto.randomBytes(16).toString("hex");
}

app.get("/", (req, res) => {
  res.send("Hello from our server!");
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});

app.post("/signup", async (req, res) => {
  try {
    // Validate request body
    if (!req.body.email || !req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email, username and password are required" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create new user
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    // Save user in the database
    const savedUser = await user.save();

    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    // Validate request body
    if (!req.body.identifier || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Identifier and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({
      $or: [{ username: req.body.identifier }, { email: req.body.identifier }],
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // User is authenticated
    res.json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
