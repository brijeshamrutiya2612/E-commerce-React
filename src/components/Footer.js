import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/loginSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import axios from "axios";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

axios.defaults.withCredentials = true;
let firstRender = true;

function Footer() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isLoggedIn = useSelector((state) => state.userlogin.isLoggedIn);
  const cart = useSelector((state) => state.cart);
  // const { getProd } = useSelector((state) => state.products);
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);

  // const refreshToken = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/api/refresh")
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return localStorage.setItem("user", JSON.stringify(data));
  // };
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/api/user")
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return localStorage.setItem("user", JSON.stringify(data));
  // };
  // useEffect(() => {
  //   async function getAllStudent() {
  //     try {
  //       const listProduct = await axios.get(
  //         "https://fakestoreapi.com/products/categories",
  //         {
  //           withCredentials: false,
  //         }
  //       );
  //       setList(listProduct.data);
  //     } catch (error) {
  //       console.log("Problem");
  //     }
  //   }
  //   getAllStudent();
  // }, []);
  // useEffect(() => {
  //   if (firstRender) {
  //     firstRender = false;
  //     sendRequest().then((data) => setUser(data.user));
  //   }
  //   let interval = setInterval(() => {
  //     refreshToken().then((data) => setUser(data.user));
  //   }, 1000 * 29);
  //   return () => clearInterval(interval);
  // }, []);

  // const sendLogoutReq = async () => {
  //   const res = await axios.post("http://localhost:5000/api/logout", null, {
  //     withCredentials: true,
  //   });
  //   if (res.status == 200) {
  //     return res;
  //   }
  //   return new Error("Unable to Logout. Please try again");
  // };
  // const handleLogout = () => {
  //   sendLogoutReq().then(() => dispatch(loginActions.logout()));
  // };
  const home = () => {
    nav("/");
  };

  return (
    <div id="myHeader">
      <div
        style={{
          minWidth: "100px",
          //   maxWidth:"500px",
          width: "100%",
          backgroundColor: "#fff",
          height: "52px",
          position: "fixed",
        }}
      >
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand className="container d-flex justify-content-center">
              <ShoppingBag
                onClick={home}
                style={{
                  fontSize: "80px",
                  textAlign: "center",
                  color: "#14657C",
                }}
              />
              <span
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  color: "#14657C",
                  lineHeight: "3em",
                }}
              >
                MART
              </span>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Footer;
