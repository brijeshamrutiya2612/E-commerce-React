import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Store } from "../store/Context";

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState([]);

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
  useEffect(() => {
    const getUnique = (arr, index) => {
      const unique = list
        .map((e) => e[index])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e])
        .map((e) => arr[e]);

      return unique;
    };
    setFilter(getUnique(list, "itemCategory"));
  }, [list]);

  const handleLogout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = '/login'
  };
  const home = () => {
    nav("/");
  };
  const handleSearch = () => {
    nav(`/products/category/${search}`);
  };
  return (
    <div id="myHeader" className="d-flex">
      <div
        style={{
          minWidth: "500px",
          // maxWidth:"1140px",
          width: "100%",
          // backgroundColor: "#fff",
          height: "52px",
          lineHeight: "52px",
          position: "sticky",
          zIndex: "40",
        }}
      >
        <Navbar
          fixed="top"
          bg="dark"
          expand="lg"
          style={{
            boxShadow: "1px 1px 10px #343A40",
            background:
              "linear-gradient(246deg, rgba(216,228,230,1) 47%, rgba(70,221,236,1) 100%)",
          }}
        >
          <Navbar.Brand onClick={home}>
            <ShoppingBag
              style={{
                fontSize: "50px",
                background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);",
              }}
            />{" "}
            MART
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
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
                    <Link to={`/ud/${userInfo._id}`}>Dashboard</Link>
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
            ) : (
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
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
