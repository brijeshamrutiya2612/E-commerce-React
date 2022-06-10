import axios from "axios";
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
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/loginReducer";


const Header = () => {
  const dispatch = useDispatch();
  
  const user = useSelector((state)=>state.users);
  const nav = useNavigate();
  const log = useNavigate();
  const cart = useSelector((state) => state.cart);
  
  const home = () => {
    nav("/");
  };
  const [student, setStudents] = useState([]);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      try {
        const listProduct = await axios.get(
          "https://fakestoreapi.com/products/categories"
          );
          setList(listProduct.data);
        } catch (error) {
          console.log("Problem");
        }
      }
    getAllStudent();
  }, []);

  const onSearch = async (event) => {
    event.preventDefault();
    const data = await axios
      .get(`https://fakestoreapi.com/products/category/${search}`)
      .then((res) => {
        setStudents(res.data);
        return <Search products={student} />;
      });
    nav(`/products/category/${search}`);
    setSearch("");
  };

  const onLogin = () =>{
      log("/Login");
  }
  const logOutSession = () =>{
      dispatch(login.rejected())
      nav("/");
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>MART</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Button
                variant="dark"
                style={{ textAlign: "left" }}
                onClick={home}
                >
                HOME
              </Button>
              <NavDropdown style={{mxWidth:"110px"}} title="PRODUCT" id="collasible-nav-dropdown">
                {list.map((item, i) => {
                  return (
                    <NavDropdown.Item key={i}>
                      <Link
                        style={{ color: "#343A40", textDecoration: "none" }}
                        to={`/products/category/${item}`}
                      >
                        {item.toUpperCase()}
                      </Link>
                    </NavDropdown.Item>
                  );
                })}
                {/* <NavDropdown.Item>WOMAN</NavDropdown.Item>
                <NavDropdown.Item>JWELLARY</NavDropdown.Item>
                <NavDropdown.Item>ELECTRONICS</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          
            <form className="d-flex my-3">
              <FormControl
                type="search"
                placeholder="Search by Category..."
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" onClick={onSearch} variant="dark">
                Search
              </Button>
              <Button onClick={home} variant="dark">
                Reset
              </Button>
            </form>
          
          <Link to="/addToCart">
            <Badge className="mx-auto" style={{ color: "white" }}>
              <BsFillCartFill color="white" fontSize="30px" />
              {cart.cartItems.length}
            </Badge>
          </Link>
          {
            user ?
          <Button className="ml-2 col-sm-1" onClick={logOutSession} variant="dark">
            Logout
          </Button>:
          <Button className="ml-2 col-sm-1" onClick={onLogin} variant="dark">
            Login
          </Button>

          }
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;
