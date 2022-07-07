import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Tab, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import axios from "axios";
import { Grid, Paper, styled, Input } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { Store } from "../../store/Context";
import SideBar from "./SideBar";

let firstRender = true;
axios.defaults.withCredentials = true;

const Userdashboard = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const dispatch = useDispatch();
  const nav = useNavigate();
  const users = useSelector((state) => state.user);
  console.log(users);
  const { isLoggedIn } = useSelector((state) => state.userlogin);
  // const cart = useSelector((state) => state.cart);
  // const { getProd } = useSelector((state) => state.products);
  const [value, setValue] = useState();
  const [user, setUser] = useState([]);

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
  const sign = useNavigate();

  const [registers, setRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
    age: "",
  });
  // console.log(registers);
  const sendUpdateRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/signup", {
        firstname: registers.firstname,
        lastname: registers.lastname,
        email: registers.email,
        password: registers.password,
        address1: registers.address1,
        address2: registers.address2,
        address3: registers.address3,
        phone: registers.phone,
        age: registers.age,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const signIn = async (e) => {
    e.preventDefault();
  };
  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    backgroundColor: "white",
    overflow: "hidden",
    boxShadow: "1px 1px 15px #343A40",
    opacity: 0.8,
    marginLeft: "2em",
    marginTop: "1em",
    padding: "2em",

    color: theme.palette.text.secondary,
  }));

  return (
    <>
     <SideBar></SideBar>
    </>
  );
};

export default Userdashboard;
