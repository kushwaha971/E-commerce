import React from "react";
import { Box, Button, Typography } from "@mui/material";
import data from "../data";
import { Link } from "react-router-dom";
import HomeScreenStyle from "../css/HomeScreenStyle";

function HomeScreen() {
  return (
    <HomeScreenStyle>
      <Typography variant="h4" className="heading">Features Products</Typography>
      <Box className="products">
        {data.products.map((product) => (
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
      </Box>
    </HomeScreenStyle>
  );
}

export default HomeScreen;
