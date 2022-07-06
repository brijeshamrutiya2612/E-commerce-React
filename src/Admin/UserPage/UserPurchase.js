import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import { Grid, Paper, styled } from "@mui/material";
import { Store } from "../../store/Context";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
  }
}
const UserPurchase = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate()
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(()=>{
    const fetchdata = async () =>{
      dispatch({type: 'FETCH_REQUEST'});
      try{
        const {data} = await axios.get(`http://localhost:5000/api/orders/mine`,{
          headers:{authorization:`Bearer ${userInfo.token}`}
        })
        dispatch({type: 'FETCH_SUCCESS', payload: data});
      }catch(err){
        dispatch({type:'FETCH_FAIL', payload: err})
      }
    }
    fetchdata();
  },[userInfo])

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
      {loading ? (
        <>
          <div className="container pt-5">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        </>
      ) : error ? (
        <div>{error}</div>
      ) : (
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
                      {userInfo && (
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
                    {orders.map((item, i) => {
                  console.log(item);
                  
                  return (
                    <Card
                    className="col ml-3 col-md-12 my-4"
                      sx={{ maxWidth: 345 }}
                      style={{ paddingLeft: "2em" }}
                    >
                      {item.orderItems.map((item,i)=>{
                        return(
                          <>
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
                      </CardContent>
                      </>
                        )
                      })}
                      <CardContent>
                        <Typography variant="h5" color="text.secondary">
                        Amount  &#x20B9; {item.totalPrice.toFixed(2)}
                        </Typography>
                        <Typography gutterBottom variant="h5" color="text.secondary">
                        Date: {item.createdAt.substring(0,10)}
                        </Typography>
                        <p>Id: {item._id}</p>
                        <Typography gutterBottom variant="h5" color="text.secondary">
                        Paid at: {item.isPaid ? item.paidAt.substring(0,10) : "No"}
                        </Typography>
                        <Typography gutterBottom variant="h5" color="text.secondary">
                        Delivered at: {item.isDelivered ? item.deliveredAt.substring(0,10): 'No'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" variant="danger">Delete</Button>
                        <Button size="small" variant="success">Repeat</Button>
                        <Button size="small" variant="warning" onClick={()=>{
                          navigate(`/order/${item._id}`)
                        }}>Detail</Button>
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
      )}
    </>
  );
};

export default UserPurchase;
