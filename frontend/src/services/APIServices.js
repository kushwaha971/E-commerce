import axios from "axios";

export const productDetails = axios.create({
  baseURL: "/api/products",
});

export const productStatus = axios.create({
  baseURL: "/api/products/slug",
});

export const cartItemDetails = axios.create({
  baseURL: "/api/products",
});

export const orderAPI = axios.create({
  baseURL: "/api/orders",
});
