import axios from "axios";

export const productDetails = axios.create({
  baseURL: "/api/products",
});
