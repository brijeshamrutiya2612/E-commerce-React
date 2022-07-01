import React, { useContext, useEffect, useState } from "react";
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
  ToastContainer,
} from "react-bootstrap";
import { Box, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/loginSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import axios from "axios";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Store } from "../store/Context";


function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart,userInfo } = state;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { getProd } = useSelector((state) => state.products);
  // const cart = useSelector((state) => state.cart);
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState([]);

  // // const refreshToken = async () => {
  // //   const res = await axios
  // //     .get("http://localhost:5000/api/refresh")
  // //     .catch((err) => console.log(err));
  // //   const data = await res.data;
  // //   return localStorage.setItem("user", JSON.stringify(data));
  // // };
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/api/users")
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return localStorage.setItem("user", JSON.stringify(data));
  // };
 
  useEffect(() => {
    const getUnique = (arr, index) => {
      const unique = getProd
        .map((e) => e[index])
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter((e) => arr[e])
        .map((e) => arr[e]);

      return unique;
    };
    setFilter(getUnique(getProd, "itemCategory"));
  }, [getProd]);
  useEffect(() => {
    async function getAllStudent() {
      try {
        const listProduct = await axios.get(
          "http://localhost:5000/api/products"
        );
        setList(listProduct.data.products);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, []);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null);
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable to Logout. Please try again");
  };
  const handleLogout = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
  };
  const home = () => {
    nav("/");
  };
  const handleSearch = () => {
    nav(`/products/category/${search}`);
  };
  return (
    <div
      id="myHeader"
      className="d-flex"
    >
      <div
        style={{
          minWidth: "500px",
          // maxWidth:"1140px",
          width: "100%",
          // backgroundColor: "#fff",
          height: "52px",
          lineHeight: "52px",

          zIndex: "40",
        }}
      >
        <Navbar
          fixed="top"
          bg="light"
          expand="lg"
          sx={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(11,117,158,1) 29%, rgba(0,212,255,1) 100%)",
          }}
          style={{
            boxShadow: "1px 1px 10px #343A40",
          }}
        >
          <Container>
            <Navbar.Brand onClick={home}>
              <ShoppingBag style={{ fontSize: "50px", color: "#14657C" }} />{" "}
              MART
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="me-auto"
                style={{ maxHeight: "500px" }}
                navbarScroll
              >
                <NavDropdown title="PRODUCTS" id="basic-nav-dropdown">
                  {filter.map((item, i) => {
                    return (
                      <NavDropdown.Item key={i}>
                        <Link
                          to={`/products/category/${item.itemCategory}`}
                          style={{ color: "#000000" }}
                        >
                          {item.itemCategory.toUpperCase()}
                        </Link>
                      </NavDropdown.Item>
                    );
                  })}
                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              </Nav>
              <Form className="d-flex mx-auto mb-2">
                <Form.Control
                  type="search"
                  placeholder="Search by product, category..."
                  className="me-2 mt-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  onClick={handleSearch}
                  variant="outline-success"
                  className="ml-2"
                >
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
              {userInfo ? (
                <>
                  <NavDropdown
                    className="pr-5"
                    title={userInfo.firstname}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item>
                      <Link to={`/user/${user._id}`}>Dashboard</Link>
                    </NavDropdown.Item>
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
              ):(
                <>
                  <Tab
                    to="/login"
                    LinkComponent={Link}
                    label="Login"
                    variant="contained"
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
              <Tab
                to="/admin"
                LinkComponent={Link}
                label="Admin"
                style={{ color: "#14657C" }}
              />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
