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
  const nav = useNavigate();
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
          position: "absolute",
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
