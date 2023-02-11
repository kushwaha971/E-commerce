import User from "../models/userModel.js";
import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

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

export default userRouter;
