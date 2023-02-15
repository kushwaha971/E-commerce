import React, { useEffect, useReducer } from "react";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { productDetails } from "../services/APIServices";

import Product from "../component/Product";
import MessageBox from "../component/MessageBox";

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
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
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
    <React.Fragment>
      <Typography
        sx={{ fontSize: "1.5rem", fontWeight: "bold", marginLeft: "1rem" }}
      >
        Features Products
      </Typography>
      <Box>
        {loading ? (
          <Stack sx={{ display: "flex" }}>
            <CircularProgress color="success" sx={{ margin: "auto" }} />
          </Stack>
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <Grid spacing={2} sx={{ justifyContent: "center" }} container>
            {products.map((product) => (
              <Grid item key={product.name.toString()}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </React.Fragment>
  );
}

export default HomeScreen;
