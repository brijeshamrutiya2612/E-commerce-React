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
  const nav = useNavigate();
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
    nav("/");
  };
  return (
    <div
      className="col-md-8 ml-3 mt-3 mb-5"
      style={{ width: "auto", background: "#96B5BA", height: "100%"}}
    >
      <div className="d-flex">
        <Typography variant="h6" className="pl-5 my-2">
          Welcome, {userInfo.firstname} {userInfo.lastname}
        </Typography>
      </div>
      <div className="">
        <div className="row">
          <div>
            <Grid container spacing={1}>
              <Grid item xs={9} md={15}>
                <Item>
                  &#x2003;
                  <Link
                    style={{
                      color: "black",
                    }}
                    to={`/ud/${userInfo._id}`}
                  >
                    <DashboardIcon />&#x2003;
                    <strong>Dashboard</strong>
                  </Link>
                </Item>
                <Item>
                  &#x2003;
                  <Link
                    style={{
                      color: "black",
                    }}
                    to={`/user/${userInfo._id}`}
                  >
                    <PersonIcon />&#x2003;
                    <strong>Profile</strong>
                  </Link>
                </Item>
                <Item>
                  &#x2003;
                  <Link
                    style={{
                      float: "right",
                      color: "black",
                    }}
                    to={`/u_purchase/${userInfo._id}`}
                  >
                    <HistoryIcon />&#x2003;
                    <strong>Purchase History</strong>
                  </Link>
                </Item>
                <Item>
                  
                  &#x2003;
                  <Button
                    variant="light"
                    style={{
                      lineHeight: "1em",
                      fontSize: "15px",
                      color: "black",
                    }}
                    onClick={handleLogout}
                  >
                    <LogoutIcon/> &#x2003;
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
