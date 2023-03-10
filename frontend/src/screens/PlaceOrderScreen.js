import React, { useContext, useReducer } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../context/Store";
import CheckOutSteps from "../component/CheckOutSteps";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 =? 123.23

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const tableContent = [
    { title: "Items", value: `${cart.itemsPrice.toFixed(2)}` },
    { title: "Shipping", value: `${cart.shippingPrice.toFixed(2)}` },
    { title: "Tax", value: `${cart.taxPrice.toFixed(2)}` },
    { title: "Total", value: `${cart.totalPrice.toFixed(2)}` },
  ];

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      contextDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };
  React.useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  });
  return (
    <React.Fragment>
      <CheckOutSteps state={3} />
      <Typography variant="h4">Preview Order</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ margin: "1rem", padding: "1rem" }}>
          <Card sx={{ padding: "1rem", margin: "4px" }}>
            <CardHeader title="Shipping" />
            <CardContent>
              <Typography>
                <strong>Name: </strong>
                {cart.shippingAddress.name}
              </Typography>
              <Typography>
                <strong>Address: </strong>
                {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postal}`}
              </Typography>
            </CardContent>
            <Link to="/shipping">Edit</Link>
          </Card>

          <Card sx={{ padding: "1rem", margin: "4px" }}>
            <CardHeader title="Payment Method" />
            <CardContent>
              <Typography>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </Typography>
            </CardContent>
            <Link to="/payment">Edit</Link>
          </Card>

          <Card sx={{ margin: "2px" }}>
            <CardHeader title="Items" />
            <CardContent>
              {cart.cartItems.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        width: "40px",
                        marginTop: "4px",
                      }}
                    />
                  </Box>
                  <Link to={`/product/${item.slug}`}>
                    <Typography variant="h6" sx={{}}>
                      {item.name}
                    </Typography>
                  </Link>
                  <Typography variant="text">{item.quantity}</Typography>{" "}
                  <Typography variant="subtitle1">
                    $ {item.price * item.quantity}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card sx={{ padding: "0 2rem" }}>
            <CardHeader title="Order Summary" />
            <CardContent>
              <Table>
                <TableBody>
                  {tableContent.map((rowValue) => (
                    <TableRow key={rowValue.title}>
                      <TableCell component="th" scope="row">
                        {rowValue.title}
                      </TableCell>
                      <TableCell align="right">{rowValue.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CardActions>
                <Button
                  type="button"
                  variant="contained"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                  color="warning"
                  fullWidth
                >
                  Place Order
                </Button>
                {loading && (
                  <Stack sx={{ display: "flex" }}>
                    <CircularProgress color="success" sx={{ margin: "auto" }} />
                  </Stack>
                )}
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default PlaceOrderScreen;
