import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Badge, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Store } from "./context/Store";

function App() {
  
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <React.Fragment>
      <div className="container">
        <BrowserRouter>
          <header>
            <div className="header">
              <Link to="/">Logo</Link>
              <Link to="/cart">
              <Stack aria-label="cart">
                <Badge badgeContent={cart.cartItems.reduce((acc,curr) => acc+curr.quantity, 0)} color="secondary">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </Stack>
              </Link>
            </div>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
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
