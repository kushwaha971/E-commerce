import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Typography } from "@mui/material";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <BrowserRouter>
          <header>
            <div className="header">
              <Link to="/">Logo</Link>
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
