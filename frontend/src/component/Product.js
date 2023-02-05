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
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { cartItemDetails } from "../services/APIServices";
import { Store } from "../context/Store";
// import { Store } from "../context/Store";

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

  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await cartItemDetails.get(`/${item._id}`);
    if (data.countStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }

    contextDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
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
            {product.countStock === 0 ? (
              <Button
                disabled
                sx={{
                  "&.Mui-disabled": {
                    background: "#eaeaea",
                    color: "black",
                  },
                  textTransform: "capitalize",
                  borderRadius: "25px",
                }}
                variant="outlined"
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                color="warning"
                sx={{ textTransform: "capitalize", borderRadius: "25px" }}
                onClick={() => addToCartHandler(product)}
              >
                Add to Cart
              </Button>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </ProductStyle>
  );
}

export default Product;
