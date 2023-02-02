import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <React.Fragment>
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
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
