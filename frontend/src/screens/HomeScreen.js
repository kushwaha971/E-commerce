import React, { useEffect, useReducer } from "react";
import { Box, Button, Typography } from "@mui/material";
// import data from "../data";
import { Link } from "react-router-dom";
import HomeScreenStyle from "../css/HomeScreenStyle";
import { productDetails } from "../services/APIServices";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await productDetails.get();
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <HomeScreenStyle>
      <Typography variant="h4" className="heading">
        Features Products
      </Typography>
      <Box className="products">
        {loading ? (
          <Typography>Loading....</Typography>
        ) : error ? (
          <Typography>{error}</Typography>
        ) : (
          <>
            {products.map((product) => (
              <Box className="product" key={product.name.toString()}>
                <Link to={`/product/${product.slug}`}>
                  <img
                    className="productImage"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>

                <div className="productInfo">
                  <Link to={`/product/${product.slug}`}>
                    <Typography>{product.name}</Typography>
                  </Link>
                  <Typography>
                    <strong>${product.price}</strong>
                  </Typography>
                  <Button variant="outlined">Add to Cart</Button>
                </div>
              </Box>
            ))}
          </>
        )}
      </Box>
    </HomeScreenStyle>
  );
}

export default HomeScreen;
