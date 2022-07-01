import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tab,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import axios from "axios";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Grid, Paper, styled, Input } from "@mui/material";
import { getData } from "../../store/ProductsSlice";
import { ChevronCompactLeft } from "react-bootstrap-icons";
// import shop from "./login_bck.jpg";

// let firstRender = true;
// axios.defaults.withCredentials = true;

const UserPurchase = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const id = localStorage.getItem("userId");
  const isLoggedIn = useSelector((state) => state.userlogin.isLoggedIn);
  const [uProd, setUprod] = useState([]);

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/userproducts/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data.UserProducts.UserProducts;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUprod(data));
  }, []);
  console.log(uProd);

  //   const sendLogoutReq = async () => {
  //     const res = await axios.post("http://localhost:5000/api/logout", null, {
  //       withCredentials: true,
  //     });
  //     if (res.status == 200) {
  //       return res;
  //     }
  //     return new Error("Unable to Logout. Please try again");
  //   };
  //   const handleLogout = () => {
  //     sendLogoutReq().then(() => dispatch(loginActions.logout()));
  //   };

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
      <div className="pl-3 container d-flex">
        <Typography className="d-flex pl-5" style={{ fontSize: "40px" }}>
          Welcome,
        </Typography>
      </div>
      <div className="pl-3 my-4 d-flex">
        <div className="row">
          <div
            style={{
              height: "auto",
              width: "auto",
              lineHeight: "52px",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={9} md={15}>
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
                  <HistoryIcon />
                  &#x2003;
                  <Link
                    style={{
                      lineHeight: "1.2em",
                      fontSize: "20px",
                      color: "black",
                    }}
                    to="/u_purchase"
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
                        // onClick={handleLogout}
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
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "auto",
                height: "auto",
              }}
            >
              <div className="row mx-auto pl-5">
                {uProd.map((item, i) => {
                  console.log(item);

                  return (
                    <Card
                      className="col ml-3 col-md-12 my-4"
                      sx={{ maxWidth: 345 }}
                      style={{ paddingLeft: "2em" }}
                    >
                      <CardMedia
                        style={{
                          height: "8em",
                          width: "auto",
                          margin: "auto",
                        }}
                        component="img"
                        image={item.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.itemName}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          &#x20B9; {item.itemPrice}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPurchase;
