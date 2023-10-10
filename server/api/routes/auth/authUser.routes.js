const express = require("express");
const User = require("../../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../../utils/jwt/jwt");
// const { isAuth } = require("../../middleware/auth");
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    console.log("recibido:", req.body)
    const newUser = new User(user);
    if (newUser.rol === "user") {
      const created = await newUser.save();
      return res.status(201).json(created);
    } else {
      return res.status(500).json("Error. User not registered");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
});

router.post("/login", async (req, res) => {
  try {
    const userDb = await User.findOne({ email: req.body.email });
    if (!userDb) {
      return res.status(404).json("Login error");
    }
    if (bcrypt.compareSync(req.body.password, userDb.password)) {
      const token = generateSign(userDb._id, userDb.email);
      return res.status(200).json({ token, userDb });
    } else {
      return res.status(500).json("Login error");
    }
  } catch (error) {
    return res.status(500).json("Login error", error);
  }
});

module.exports = router;
