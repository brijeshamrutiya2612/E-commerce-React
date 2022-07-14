import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const [id, setId] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/mine`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    fetchdata();
    const fetchProductId = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products`);
        setId(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductId();
  }, [userInfo]);
  console.log(id);
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
          {/* <div className="my-4 d-flex"> */}
          <Row>
            <Col md={3} style={{ height: "auto" }}>
              <SideBar></SideBar>
            </Col>
            <Col lg={8} style={{ height: "auto", width: "auto" }}>
              {/* <div>
              <div
                className="col-lg-15 my-5"
                style={{ paddingLeft: "5em"}}
              >
                <div
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    width: "auto",
                    height: "auto",
                  }}
                >
                  <div className="pl-5"> */}
              <TableContainer component={Paper}>
                <Table sx={{ width: 750 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell colSpan={2}>Item Description</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Delivered</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((item, i) => {
                      return (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          {item.orderItems.map((val, i) => {
                            return (
                              <>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    style={{
                                      width: "100px",

                                      marginRight: "12px",
                                    }}
                                  >
                                    <img
                                      style={{
                                        minWidth: "100px",
                                        maxWidth: "200px",
                                        width: "100px",
                                        height: "150px",
                                        float: "left",
                                        marginTop: "1em",
                                        marginRight: "12px",
                                      }}
                                      className="img-fluid"
                                      src={val.image}
                                      alt=""
                                    />
                                    <>
                                      <Button
                                        className="my-2"
                                        size="md"
                                        variant="success"
                                        onClick={() => {
                                          navigate(`/seller/${val._id}`);
                                        }}
                                      >
                                        Repeat
                                      </Button>
                                    </>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    <b>{item.itemName}</b>
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })}
                          <TableCell align="left">
                            <Button variant="danger" className="btn btn-sm">
                              <i className="fas fa-trash"></i>
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <span className="mx-2">
                              {item.isDelivered
                                ? item.deliveredAt.substring(0, 10)
                                : "No"}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            <span className="mx-2">
                              {item.isPaid
                                ? item.paidAt.substring(0, 10)
                                : "No"}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            {item.createdAt.substring(0, 10)}
                          </TableCell>
                          <TableCell align="right">
                            &#x20B9; {item.totalPrice.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* </div>
                </div>
              </div>
            </div> */}
            </Col>
          </Row>
          {/* </div> */}
        </>
      )}
    </>
  );
};

export default UserPurchase;
