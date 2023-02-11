import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../component/MessageBox";
import { Store } from "../context/Store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { cartItemDetails } from "../services/APIServices";

function CartScreen() {
  const navigate = useNavigate();

  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
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

  const removeCartHandler = (item) => {
    contextDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const CheckoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <Box sx={{ maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        Shopping Cart
      </Typography>
      <Box>
        <Box>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty. <Link to="/">Go to Shopping</Link>
            </MessageBox>
          ) : (
            <>
              <Divider />
              {cartItems.map((item) => (
                <Card
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    margin: "1rem",
                    border: "1px solid black",
                  }}
                >
                  <Box>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        width: "100px",
                        marginTop: "4px",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",

                      flexDirection: "column",
                      margin: "0.5rem",
                    }}
                  >
                    <Link to={`/product/${item.slug}`}>
                      <Typography variant="h6" sx={{ margin: "0 1rem" }}>
                        {item.name}
                      </Typography>
                    </Link>
                    <Box>
                      <Typography variant="h6" sx={{ margin: "0 1rem" }}>
                        Price <strong>$ {item.price * item.quantity}</strong>
                      </Typography>
                    </Box>
                    <Box sx={{ margin: "0 1rem" }}>
                      <IconButton
                        disabled={item.quantity === item.countStock}
                        onClick={() => {
                          updateCartHandler(item, item.quantity + 1);
                        }}
                      >
                        {<AddCircleOutlineIcon />}
                      </IconButton>{" "}
                      <Typography variant="text">{item.quantity}</Typography>{" "}
                      <IconButton
                        onClick={() => {
                          updateCartHandler(item, item.quantity - 1);
                        }}
                        disabled={item.quantity === 1}
                      >
                        {<RemoveCircleOutlineIcon />}
                      </IconButton>
                    </Box>
                    <Box sx={{ margin: "0 1rem" }}>
                      <Button
                        onClick={() => {
                          removeCartHandler(item);
                        }}
                        color="error"
                        variant="contained"
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "25px",
                        }}
                      >
                        Remove Item
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))}
              <Divider />
            </>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "1rem",
              border: "2px solid black",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            <Typography variant="h6">
              Sub Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}
              items):
              <strong>
                {" "}
                ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </strong>
            </Typography>
            <Button
              variant="contained"
              color="warning"
              onClick={CheckoutHandler}
              disabled={cartItems.length === 0}
              sx={{
                textTransform: "capitalize",
                margin: "4px",
                borderRadius: "25px",
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CartScreen;
