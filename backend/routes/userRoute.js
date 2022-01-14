const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
var MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
var url =
  "mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.9vwtf.mongodb.net/test";

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    password: req.body.password,
    sport: req.body.sport,
  });

  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.send("Error");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.sport = req.body.sport;
    user.password = req.body.password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.send("Error");
  }
});

module.exports = router;
