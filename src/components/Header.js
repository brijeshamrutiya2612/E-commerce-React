import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import {  Box, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/loginSlice";
import { BsFillCartFill } from "react-icons/bs";
import axios from "axios";

axios.defaults.withCredentials = true;
function Header() {
  let firstRender = true;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isLoggedIn = useSelector((state) => state.userlogin.isLoggedIn);
  // const cart = useSelector((state) => state.cart);
  const [value, setValue] = useState();
  const [user, setUser] = useState();

  //   const refreshToken = async () =>{
  //         const res = await axios.get("http://localhost:5000/api/refresh", {
  //           withCredentials: true,
  //         }).catch(err => console.log(err))
  //         const data = await res.data
  //         return data;
  //       }
  //   const sendRequest = async () => {
  //   const res = await axios.get('http://localhost:5000/api/user' , {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };
  useEffect(() => {
    // if(firstRender){
    //   firstRender = false
    //   sendRequest().then((data)=> setUser(data.user));
    // }
    // let interval = setInterval(()=>{
    //   refreshToken().then((data)=>setUser(data.user))
    // },1000 * 29)
    // return ()=>clearInterval(interval)
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
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          backgroundColor: "#14657C",
        }}
        variant="dark"
      >
        <Navbar.Brand>MART</Navbar.Brand>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="col-md-3">
            <Nav>
              <Button
                variant="dark"
                style={{ textAlign: "left" }}
                onClick={home}
              >
                HOME
              </Button>
              <NavDropdown
                style={{ mxWidth: "110px" }}
                title="PRODUCT"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link
                    style={{ color: "#343A40", textDecoration: "none" }}
                    to="/"
                  >
                  </Link>
                </NavDropdown.Item>
                {/* <NavDropdown.Item>WOMAN</NavDropdown.Item>
            <NavDropdown.Item>JWELLARY</NavDropdown.Item>
            <NavDropdown.Item>ELECTRONICS</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <form className="d-flex my-3 col-md-8">
            <FormControl
              type="search"
              placeholder="Search by Category..."

              aria-label="Search" />
            <Button
              className="ml-3"
              type="submit"
              variant="dark"
            >
              Search
            </Button>
            <Button className="ml-1" onClick={home} variant="dark">
              Reset
            </Button>
          </form>

          <Link to="/addToCart">
            <Badge className="ml-3" style={{ color: "white" }}>
              <BsFillCartFill color="white" fontSize="30px" />
              {/* {cart.cartItems.length} */}
            </Badge>
          </Link>
          <div className="text-right col-md-1">
          </div>
          <Box sx={{ marginLeft: "auto" }}>
            
              {!isLoggedIn && (<>
                <Tab to="/login" LinkComponent={Link} label="Login" />
                <Tab to="/register" LinkComponent={Link} label="Signup" />
              </>)}
              {isLoggedIn && (
                <>
                  <Tab
                    onClick={handleLogout}
                    to="/"
                    LinkComponent={Link}
                    label="Logout" />
                  <p>{user && user.firstname}</p>
                </>
              )}
          </Box>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
