import React, { useContext, useEffect, useReducer } from "react";
import { Button, Spinner } from "react-bootstrap";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../../store/Context";
import SideBar from "./SideBar";

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
          
          <div className="pl-3 my-4 d-flex">
            <div className="row">
            <SideBar></SideBar>  
              <div className="col my-5 col-md-15" style={{paddingLeft:"15em"}}>
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