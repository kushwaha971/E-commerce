import express from "express";
import data from "../data.js";
import Product from "../models/productModels.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  // Remove all the previous  records
  await Product.remove({});
//   Add data
  const createdProducts = await Product.insertMany(data.products);
 res.send(createdProducts);
});
export default seedRouter;

