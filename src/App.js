import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import 'react-toastify/dist/ReactToastify.css';
import Seller from "./components/Seller";
import Search from "./components/Search";
import Addtocart from "./components/Addtocart";
import Login from "./components/Login";
import Register from "./components/Register";
import Finalpayment from "./components/Finalpayment";
import Header from "./components/Header";
import New from "./components/New";
import Userprofile from "./Admin/UserPage/Userprofile";
import Footer from "./components/Footer";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Pages/Dashboard";
import AddProducts from "./Admin/Pages/AddProducts";
import User from "./Admin/Pages/User";
import UserDashboard from "./Admin/UserPage/UserDashboard";
import UserPurchase from "./Admin/UserPage/UserPurchase";
import { Container } from "react-bootstrap";
import { Store } from "./store/Context";
import ShippingAddress from "./components/ShippingAddress";
import { ToastContainer } from "react-toastify";
import Payment from "./components/Payment";

function App() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <React.Fragment>
      <div
        style={{ margin: "auto" }}
        className="d-flex flex-column site-container"
      >
        <header>
          <Container>
            <Header />
          </Container>
        </header>
        <main className="pt-5">
          <Container>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              {userInfo && <Route path="/" element={<Home />}></Route>}{" "}
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/products/category/:search"
                element={<Search />}
              ></Route>
              <Route path="/addToCart" element={<Addtocart />}></Route>
              <Route path="/Finalpayment" element={<Finalpayment />}></Route>
              <Route path="/shipping" element={<ShippingAddress/>}></Route>
              <Route path="/Payment" element={<Payment/>}></Route>
              <Route path="/Seller/:id" element={<Seller />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/user/:id" element={<Userprofile />}></Route>
              <Route path="/Admin" element={<Admin />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/addproducts" element={<AddProducts />}></Route>
              <Route path="/user" element={<User />}></Route>
              <Route path="/ud" element={<UserDashboard />}></Route>
              <Route path="/u_purchase" element={<UserPurchase />}></Route>
            </Routes>
          </Container>
        </main>
        <header>
          <Footer />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
