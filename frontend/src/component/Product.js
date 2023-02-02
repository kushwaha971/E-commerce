import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ProductStyle = styled(Box)(({ theme }) => ({
  ".productImage": {
    width: "260px",

    height: "310px",
  },
  ".product": {
    margin: "1rem",
    padding: "1rem",
    border: "2px solid black",
    borderRadius: "4px",
  },
}));

function Product(Props) {
  const { product } = Props;
  return (
    <ProductStyle>
      <Card className="product">
        <Link to={`/product/${product.slug}`}>
          <CardMedia
            component="img"
            image={product.image}
            className="productImage"
          />
        </Link>
        <CardContent>
          <Link to={`/product/${product.slug}`}>
            <Typography gutterBottom variant="h6">
              {product.name}
            </Typography>
          </Link>
          <Box sx={{ display: "flex" }}>
            <Rating
              value={product.rating}
              size="small"
              readOnly
              precision={0.5}
              emptyIcon={
                <StarBorderIcon sx={{ opacity: 0.5 }} fontSize="inherit" />
              }
            />
            <Typography
              variant="subtitle2"
              style={{ color: "#ffab00", marginLeft: "4px" }}
            >
              {" "}
              {product.numReviews} reviews
            </Typography>
          </Box>
          <Typography>
            <strong>${product.price}</strong>
          </Typography>
          <CardActions>
            <Button variant="contained" fullWidth>
              Add to Cart
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </ProductStyle>
  );
}

export default Product;
