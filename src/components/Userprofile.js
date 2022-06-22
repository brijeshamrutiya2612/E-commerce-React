import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/loginSlice";
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
            display: "block",
          }}
        >
          <sapn className="pl-3" style={{ fontSize: "40px" }}>
            User Profile
          </sapn>
          <Grid container spacing={1}>
            <Grid item xs={9} md={15}>
              <Item>
                <DashboardIcon style={{ float: "left" }} />
                &#x2003;
                <Link
                  style={{
                    lineHeight: "1.2em",
                    fontSize: "20px",
                    color: "black",
                  }}
                  to="/"
                >
                  <strong>Dashboard</strong>
                </Link>
              </Item>
              <Item>
                <HomeIcon style={{ float: "left" }} />
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
                <HistoryIcon style={{ float: "left" }} />
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
                    <LogoutIcon style={{ float: "left" }} />
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
        <div className="col">
          <div
            style={{
              // backgroundImage: `url(${shop}`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "auto",
              height: "auto",
            }}
          >
            <div className="container justify-content-center">
              <form>
                <Container className="pt-5 justify-content-center">
                  <div
                    className="container justify-content-center"
                    style={{
                      backgroundColor: "white",
                      overflow: "hidden",
                      boxShadow: "1px 1px 15px #343A40",
                      borderRadius: "20px",
                      opacity: 0.8,
                    }}
                  >
                    <h2 className="container pt-4 ml-4 col-md-11">Profile</h2>
                    <div className="container col-md-15 justify-content-center">
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        label="Firstname"
                        type="text"
                        variant="standard"
                        name="name.firstname"
                        value={user.firstname}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            firstname: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="container col-md-15 justify-content-center">
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        label="Lastname"
                        variant="standard"
                        name="name.lastname"
                        value={user.lastname}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            lastname: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* <div className="container col-md-15 justify-content-center">
            <Input
              className="ml-4 col-md-11 my-3 justify-content-center"
              label="Username"
              variant="outlined"
              onChange={(e) =>
                setRegister({ ...registers, username: e.target.value })
              }
            />
          </div> */}
                    <div className="container col-md-15 justify-content-center">
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        type="email"
                        label="Email"
                        name="email"
                        variant="standard"
                        value={user.email}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="container col-md-15 justify-content-center">
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        label="Password"
                        type="password"
                        variant="standard"
                        value={user.password}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="container col-md-15 justify-content-center">
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        label="Address1"
                        type="text"
                        variant="standard"
                        value={user.address1}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            address1: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="container col-md-15 justify-content-center">
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        label="Address2"
                        type="text"
                        variant="standard"
                        value={user.address2}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            address2: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="container col-md-15 justify-content-center">
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        label="Address3"
                        type="text"
                        variant="standard"
                        value={user.address3}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            address3: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="container col-md-15 justify-content-center">
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        label="Mobile:"
                        type="number"
                        variant="standard"
                        value={user.phone}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            phone: e.target.value,
                          })
                        }
                      />
                      <Input
                        className="ml-4 col-md-11 my-3 justify-content-center"
                        label="Age:"
                        type="number"
                        variant="standard"
                        value={user.age}
                        onChange={(e) =>
                          setRegister({
                            ...registers,
                            age: e.target.value,
                          })
                        }
                      />
                      <div className="my-5 justify-content-center">
                        <Button
                          className="ml-4 col-md-11 justify-content-center"
                          variant="contained"
                          onClick={signIn}
                        >
                          Sign Up
                          {/* {register.registerStatus === "pending"
                        ? "Submitting"
                        : "Register"} */}
                        </Button>
                        {/* {register.registerStatus === "rejected" ? (
                      <p>{register.registerError}</p>
                    ) : null} */}
                      </div>
                      <p>
                        Have an account? <Link to="/Login">Log in</Link>
                      </p>
                    </div>
                  </div>
                </Container>
              </form>
              {/* {register.map((item, i)=>{
      return(
        <p key={i}>{item.firstname}</p>
      )
    })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userprofile;
