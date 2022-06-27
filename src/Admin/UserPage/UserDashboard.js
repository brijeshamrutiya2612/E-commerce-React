import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import axios from "axios";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import { Grid, Paper, styled, Input } from "@mui/material";
// import shop from "./login_bck.jpg";

let firstRender = true;
axios.defaults.withCredentials = true;

const Userprofile = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const users = useSelector((state) => state.user);
  console.log(users);
  const isLoggedIn = useSelector((state) => state.userlogin.isLoggedIn);
  // const cart = useSelector((state) => state.cart);
  // const { getProd } = useSelector((state) => state.products);
  const [value, setValue] = useState();
  const [user, setUser] = useState([]);

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/refresh")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user")
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
    sendRequest().then(() => sign("/login"));
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
      <div className="container"></div>
      <div className="pt-1"></div>
      <div className="row">
        <div
          style={{
            height: "52px",
            lineHeight: "52px",
            
          }}
        >
          <sapn className="pl-3" style={{ fontSize: "40px" }}>
            User Profile
          </sapn>
          <Grid container spacing={1}>
            <Grid item xs={9} md={15}>
              <Item>
                <DashboardIcon />
                &#x2003;
                <Link
                  style={{
                    lineHeight: "1.2em",
                    fontSize: "20px",
                    color: "black",
                  }}
                  to="/ud"
                >
                  <strong>Dashboard</strong>
                </Link>
              </Item>
              <Item>
                <HomeIcon />
                &#x2003;
                <Link
                  style={{
                    lineHeight: "1.2em",
                    fontSize: "20px",
                    color: "black",
                  }}
                  to="/"
                >
                  <strong>Home</strong>
                </Link>
              </Item>
              <Item>
                <HistoryIcon />
                &#x2003;
                <Link
                  style={{
                    lineHeight: "1.2em",
                    fontSize: "20px",
                    color: "black",
                  }}
                  to="/"
                >
                  <strong>Purchase History</strong>
                </Link>
              </Item>
              <Item>
                {isLoggedIn && (
                  <>
                    <LogoutIcon />
                    &#x2003;
                    <Link
                    onClick={handleLogout}
                      style={{
                        lineHeight: "1.2em",
                        fontSize: "20px",
                        color: "black",
                      }}
                      to="/"
                    >
                      <strong>Logout</strong>
                    </Link>
                  </>
                )}
              </Item>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Userprofile;
