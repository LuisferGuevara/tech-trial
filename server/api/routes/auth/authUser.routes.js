const express = require("express");
const User = require("../../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../../utils/jwt/jwt");
const { isAuth } = require("../../middlewares/auth");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    user.role = "user";
    const newUser = new User(user);
    if (newUser.role === "user") {
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

router.post("/logout", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const userModify = new User(user);
    userModify._id = id;
    const userUpdate = await User.findByIdAndUpdate(id, userModify, {
      returnOriginal: false,
    }).select("-password");
    return res.status(200).json(userUpdate);
  } catch (error) {
    return next(error);
  }
});

router.get("/getAllUsers", [isAuth], async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role === "admin") {
      const users = await User.find({}).select({ email: 1, name: 1, lastName: 1 });
      return res.status(200).json(users);
    } else {
      return res.status(401).json("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/checksession", [isAuth], async (req, res) => {
  try {
    return res.status(200).json({ token: req.token, userDb: req.user });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      return res.status(200).json({ message: "User deleted" });
    } else {
      return res.status(404).json({ message: "Usuar not found" });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
