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
import Userprofile from "./components/Userprofile";
import Footer from "./components/Footer";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Pages/Dashboard";
import AddProducts from "./Admin/Pages/AddProducts";
import User from "./Admin/Pages/User"


function App() {
  const isLoggedIn = useSelector((state) => state.userlogin.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <div style={{margin: "auto"}}>
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
          <Route path="/user/:id" element={<Userprofile/>}></Route>
          <Route path="/Admin" element={<Admin/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/addproducts" element={<AddProducts/>}></Route>
          <Route path="/user" element={<User/>}></Route>
        </Routes>  
      </main>
      <header>
        <Footer/>
      </header>
      </div>
    </React.Fragment>
  );
}

export default App;
