import React, { useContext, useEffect, useReducer } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { cartItems, productStatus } from "../services/APIServices";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getError } from "../utils";
import MessageBox from "../component/MessageBox";
import { Store } from "../context/Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await productStatus.get(`/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    // console.log(existItem.quantity);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // console.log(quantity)
    const data = await cartItems.get(`/${product._id}`);
    if(data.countStock < quantity){
      window.alert('Sorry, Product is out of stock');
      return;
    }

    contextDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };
  return (
    <React.Fragment>
      {loading ? (
        <Stack sx={{ display: "flex" }}>
          <CircularProgress color="success" sx={{ margin: "auto" }} />
        </Stack>
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <>
          <Grid container>
            <Grid item md={5}>
              <Box>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: "90%" }}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box sx={{ width: "100%", margin: "1rem", padding: "1rem" }}>
                <Typography variant="h4">{product.name}</Typography>
                <Box sx={{ display: "flex" }}>
                  <Rating
                    value={product.rating}
                    size="small"
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarBorderIcon
                        sx={{ opacity: 0.5 }}
                        fontSize="inherit"
                      />
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
                <Typography variant="subtitle1">
                  {" "}
                  Price: <strong>${product.price}</strong>
                </Typography>
                <Divider />

                <Typography variant="h6" mt={0.5} mb={0.5}>
                  Status:
                  {product.countStock > 0 ? (
                    <Chip
                      label="In Stock"
                      color="success"
                      sx={{ marginLeft: "10px" }}
                    />
                  ) : (
                    <Chip
                      label="Out of Stock"
                      color="error"
                      sx={{ marginLeft: "10px" }}
                    />
                  )}
                </Typography>
                <Divider />
                <Typography variant="subtitle2" mt={1}>
                  Description: <span>{product.description}</span>
                </Typography>
                {product.countStock > 0 ? (
                  <Button
                    variant="contained"
                    fullWidth
                    color="warning"
                    sx={{ margin: "10px 0px" }}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
}

export default ProductScreen;
