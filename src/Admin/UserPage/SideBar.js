import { Grid, Paper, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../store/Context";
import styled from "@emotion/styled";
import { Button } from "react-bootstrap";

const SideBar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const nav = useNavigate()
  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    backgroundColor: "white",
    overflow: "hidden",
    boxShadow: "1px 1px 15px #343A40",
    opacity: 0.8,
    marginLeft: "2em",
    marginTop: "1em",
    padding: "2em",
  }));
  const handleLogout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    nav("/")
  };
  return (
    <div style={{ width:"800px"}}>
      <div className="d-flex">
        <Typography
          variant="h6"
          className="pl-4 my-4"
        >
          Welcome, {userInfo.firstname} {userInfo.lastname}
        </Typography>
      </div>
      <div className="pl-3 my-5 d-flex">
        <div className="row">
          <div
            style={{
              height: "52px",
              lineHeight: "52px",
              height: "auto",
              margin: "auto",
              width: "auto",
            }}
          >
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
                    to={`/ud/${userInfo._id}`}
                  >
                    <strong>Dashboard</strong>
                  </Link>
                </Item>
                <Item>
                  <PersonIcon style={{ float: "left" }} />
                  &#x2003;
                  <Link
                    style={{
                      lineHeight: "1.2em",
                      fontSize: "20px",
                      color: "black",
                    }}
                    to={`/user/${userInfo._id}`}
                  >
                    <strong>Profile</strong>
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
                    to={`/u_purchase/${userInfo._id}`}
                  >
                    <strong>Purchase History</strong>
                  </Link>
                </Item>
                <Item>
                  
                      <LogoutIcon style={{ float: "left" }} />
                      &#x2003;
                      <Button
                      variant="light"
                        style={{
                          lineHeight: "1.2em",
                          fontSize: "20px",
                          color: "black",
                        }}
                        onClick={handleLogout}
                      >
                        <strong>Logout</strong>
                      </Button>
                </Item>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
