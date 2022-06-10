import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./commponets/Home";
import Search from "./commponets/Search";
import Seller from "./commponets/Seller";
import Addtocart from "./commponets/Addtocart";
import Login from "./commponets/Login";
import Register from "./commponets/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/category/:search" element={<Search />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/addToCart" element={<Addtocart/>}></Route>
          <Route path="/Seller/:id" element={<Seller />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
