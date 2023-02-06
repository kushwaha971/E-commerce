import express from "express";
import data from "../data.js";
import Product from "../models/productModels.js";
import User from "../models/userModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  // Remove all the previous  records
  await Product.remove({});
// Add data
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);

 res.send({createdProducts,createdUsers});
});
export default seedRouter;

