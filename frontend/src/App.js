import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductScreen from "./screens/ProductScreen";
import { Badge, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Store } from "./context/Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const SignOutHandler = () => {
    contextDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <React.Fragment>
      <div className="container">
        <BrowserRouter>
          <ToastContainer position="bottom-center" limit={1} />
          <header>
            <div className="header">
              <Link to="/">Logo</Link>
              <Link to="/cart">
                <Stack aria-label="cart">
                  <Badge
                    badgeContent={cart.cartItems.reduce(
                      (acc, curr) => acc + curr.quantity,
                      0
                    )}
                    color="secondary"
                  >
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </Badge>
                </Stack>
              </Link>
              {userInfo ? (
                <>
                  <Typography>{userInfo.name}</Typography>{" "}
                  <Typography onClick={SignOutHandler}>Sign Out</Typography>
                </>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </div>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
            </Routes>
          </main>
          <footer>
            <Typography sx={{ textAlign: "center" }}>
              All Rights Reserved
            </Typography>
          </footer>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
