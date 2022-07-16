import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
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
  const [query, setSearch] = useState('');

  useEffect(() => {
    async function getAllStudent() {
      try {
        const listProduct = await axios.get(
          "http://localhost:5000/api/products"
        );
        setList(listProduct.data);
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
  const handleSearch = (e) => {
    e.preventDefault();
    nav(query ? `/search?query=${query}` : '/search');
  };
  return (
    <div id="myHeader" className="d-flex">
      <div
        style={{
          minWidth: "500px",
          maxWidth: "100px",
          height: "25px",
          position: "sticky",
          zIndex: "40",
        }}
      >
        <Navbar
          fixed="top"
          expand="lg"
          style={{
            boxShadow: "1px 1px 10px #343A40",
            background:"#96B5BA",
          }}
        >
          <Container>
          <Navbar.Brand onClick={home} className="col-lg-15">
            <ShoppingBag
              style={{
                fontSize: "50px",
              }}
            />{" "}
            MART
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="col-lg-9">
              <NavDropdown title="PRODUCTS" id="basic-nav-dropdown">
                {filter.map((item, i) => {
                  return (
                    <NavDropdown.Item key={i}>
                      <Link
                        to={`/search?itemCategory=${item.itemCategory}`}
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
            
            <Link to="/addToCart">
              <ShoppingCartOutlinedIcon style={{ color: "#000000" }} />
              <span style={{ color: "#000000" }}>{cart.cartItems.length}</span>
            </Link>
            {userInfo ? (
              <>
                <NavDropdown
                  style={{ color: "#000000" }}
                  title={userInfo.firstname}
                  id="navbarScrollingDropdown"
                  className="mx-auto"
                  >
                  <NavDropdown.Item>
                    <Link style={{ color: "#000000" }} to={`/ud/${userInfo._id}`}>Dashboard</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <Tab
                    onClick={handleLogout}
                    to="/"
                    LinkComponent={Link}
                    label="Logout"
                    style={{ color: "#000000" }}
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
                  style={{ color: "#000000" }}
                />
                &#x2002;
                <Tab
                  to="/register"
                  LinkComponent={Link}
                  label="Signup"
                  style={{ color: "#000000" }}
                  />
              </>
            )}
            <Tab
              to="/admin"
              LinkComponent={Link}
              label="Admin"
              style={{ color: "#000000" }}
              />
          </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
