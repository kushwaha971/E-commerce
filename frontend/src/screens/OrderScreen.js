import {
  Box,
  Card,
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


import React, { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MessageBox from "../component/MessageBox";
import { Store } from "../context/Store";
import { orderAPI } from "../services/APIServices";
import { getError } from "../utils";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

function OrderScreen() {
  const params = useParams();
  const navigate = useNavigate();

  const { id: orderId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
    
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await orderAPI.get(`/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        console.log("Data",data)
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        console.log("Error",err)
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/signin");
    }

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <Stack sx={{ display: "flex" }}>
      <CircularProgress color="success" sx={{ margin: "auto" }} />
    </Stack>
  ) : error ? (
    <MessageBox variant="error">{error}</MessageBox>
  ) : (
    <Box sx={{ margin: "1rem", padding: "1rem" }}>
      <Typography variant="h6" sx={{marginLeft: '4rem'}}>Order ID {orderId}</Typography>
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
                {order.shippingAddress.name}
              </Typography>
              <Typography>
                <strong>Address: </strong>
                {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postal}`}
              </Typography>
            </CardContent>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Delivered at {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox variant="error">Not Delivered</MessageBox>
            )}
          </Card>

          <Card sx={{ padding: "1rem", margin: "4px" }}>
            <CardHeader title="Payment Method" />
            <CardContent>
              <Typography>
                <strong>Method: </strong>
                {order.paymentMethod}
              </Typography>
            </CardContent>
            {order.isPaid ? (
              <MessageBox>Paid at {order.paidAt}</MessageBox>
            ) : (
              <MessageBox variant="error">Not Paid</MessageBox>
            )}
          </Card>

          <Card sx={{ margin: "2px" }}>
            <CardHeader title="Items" />
            <CardContent>
              {order.orderItems.map((item) => (
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
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell>${order.itemsPrice.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Shipping</TableCell>
                    <TableCell>${order.shippingPrice.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell>${order.taxPrice.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Order Total</strong>
                    </TableCell>
                    <TableCell>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderScreen;
