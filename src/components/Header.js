import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Box, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/loginSlice";
import { BsFillCartFill, BsFillCartPlusFill } from "react-icons/bs";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

axios.defaults.withCredentials = true;
let firstRender = true;

function Header() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isLoggedIn = useSelector((state) => state.userlogin.isLoggedIn);
  const cart = useSelector((state) => state.cart);
  const { getProd } = useSelector((state) => state.products);
  const [value, setValue] = useState();
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);

  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable to Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(loginActions.logout()));
  };
  const home = () => {
    nav("/");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <ShoppingBag style={{ fontSize: "50px", color: "#14657C" }} /> MART
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={home}>Home</Nav.Link>
              <Nav.Link href="#action2">Products</Nav.Link>
            </Nav>
            <Form className="d-flex mx-auto mb-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 mt-2"
                aria-label="Search"
              />
              <Button variant="outline-success" className="ml-2">
                Search
              </Button>
              <Button variant="outline-danger" className="ml-2">
                Reset
              </Button>
            </Form>
            <Link to="/addToCart">
              <ShoppingCartOutlinedIcon />
              {cart.cartItems.length}
            </Link>
            {!isLoggedIn && (
              <>
                <Tab
                  to="/login"
                  LinkComponent={Link}
                  label="Login"
                  style={{ color: "#14657C" }}
                />
                &#x2002;
                <Tab
                  to="/register"
                  LinkComponent={Link}
                  label="Signup"
                  style={{ color: "#14657C" }}
                />
              </>
            )}
            {isLoggedIn && (
              <>
                <NavDropdown className="pr-5" title={user && user.firstname.toUpperCase()} id="navbarScrollingDropdown">
                  <NavDropdown.Item><Link to={`/user/${user._id}`}>Dashboard</Link></NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Your Cart
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                  style={{ color: "#14657C" }}
                />
                </NavDropdown>
                
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
