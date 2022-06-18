import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Seller from "./components/Seller";
import Search from "./components/Search";
import Addtocart from "./components/Addtocart";
import Login from "./components/Login";
import Register from "./components/Register";
import Finalpayment from "./components/Finalpayment";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import New from "./components/New";

function App() {
  const isLoggedIn = useSelector((state) => state.userlogin.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {isLoggedIn && <Route path="/" element={<Home />}></Route>}{" "}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/products/category/:search" element={<Search />}></Route>
          <Route path="/addToCart" element={<Addtocart />}></Route>
          <Route path="/Finalpayment" element={<Finalpayment />}></Route>
          <Route path="/Seller/:id" element={<Seller />}></Route>
          <Route path="/new" element={<New />}></Route>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
