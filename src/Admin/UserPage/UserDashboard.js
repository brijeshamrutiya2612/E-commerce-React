import React, { useContext, useEffect, useReducer, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import axios from "axios";
import { Paper, styled } from "@mui/material";
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

const Userdashboard = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

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
  }, [userInfo]);

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
  console.log(orders);
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
        <Row>
          <Col
            md={3}
            style={{ height: "auto", minHeight: "680px", maxHeight: "500px" }}
          >
            <SideBar></SideBar>
          </Col>
          <Col lg={8} style={{ width: "auto" }}>
            <>
              <div className="container col-lg-15">
                <Typography variant="h5" className="ml-3 my-4">
                  Dashboard
                </Typography>
                <TableContainer component={Paper} className="container">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <strong>
                            {userInfo.firstname} {userInfo.lastname}
                          </strong>
                          <br />
                          {userInfo.address1}
                          <br />
                          {userInfo.address2}
                          <br />
                          {userInfo.address3}
                        </TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="h5" className="ml-3 my-3 mt-5">
                  Your Orders Summary
                </Typography>
                <TableContainer
                  component={Paper}
                  className="mt-3 container my-4"
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            #
                          </TableCell>
                          <TableCell>
                            Product Name
                          </TableCell>
                          <TableCell>
                            Price
                          </TableCell>
                          <TableCell>
                            Date
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    <TableBody>
                      {orders.map((item, i) => {
                        return (
                          <TableRow
                            style={{
                              borderRight: "none",
                            }}
                          >
                            <TableCell>{i + 1}</TableCell>
                            {item.orderItems.map((itm) => {
                              return (
                                <>
                                  <TableRow>
                                    <TableCell>{itm.itemName}</TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
                            <TableCell>{Math.ceil(item.totalPrice)}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Userdashboard;
