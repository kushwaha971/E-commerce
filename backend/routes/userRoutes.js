import User from "../models/userModel.js";
import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

// Sign In API

userRouter.post("/signin", async (req, res) => {
  const siginUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (siginUser) {
    res.send({
      _id: siginUser.id,
      name: siginUser.name,
      email: siginUser.email,
      isAdmin: siginUser.isAdmin,
      token: generateToken(siginUser),
    });
    console.log(siginUser);
    return;
  } else {
    res.status(401).send({ message: "Invalid Email or Password" });
  }
});

// Sign Up API
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default userRouter;
