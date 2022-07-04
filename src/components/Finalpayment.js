import { Box } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTotals, removerFromCart } from "../store/CartSlice";
import { Store } from "../store/Context";
import { getData } from "../store/ProductsSlice";
import CheckOutSteps from "./CheckOutSteps";

// axios.defaults.withCredentials = true;
// let firstRender = true;

const Finalpayment = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const sub = cartItems.reduce((a, c) => a + c.itemPrice * c.quantity, 0);
  const text = cartItems.reduce(
    (a, c) => Math.floor(a + (c.itemPrice * c.quantity * 2) / 100),
    0
  );
  console.log(shippingAddress);
  const final = sub + text;
  const ship = final + 100;

  const users = useSelector((state) => state.userlogin.isLoggedIn);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [user, setUser] = useState();
  // const cart = useSelector((state) => state.cart);
  // const tax = (cart.cartTotalAmount * 23) / 100;
  // const gTotal = cart.cartTotalAmount + tax;

  // useEffect(() => {
  //   dispatch(getTotals());
  // }, [cart]);

  useEffect(() => {
    dispatch(getData());
  }, []);
  // let a = cart;
  // console.log(a);
  // console.log(cart.cartItems.map((item) => item.itemCategory));

  // const sendRequest = async () => {
  //   const res = await axios
  //     .post("http://localhost:5000/api/userproducts/add", {
  //       itemCategory: cart.cartItems.map((item) => {
  //         return item.itemCategory;
  //       }),
  //       itemName: cart.cartItems.map((item) => {
  //         return item.itemName;
  //       }),
  //       itemPrice: cart.cartItems.map((item) => {
  //         return item.itemPrice;
  //       }),
  //       itemQty: cart.cartItems.map((item) => {
  //         return item.itemQty;
  //       }),
  //       itemUnit: cart.cartItems.map((item) => {
  //         return item.itemUnit;
  //       }),
  //       itemDescription: cart.cartItems.map((item) => {
  //         return item.itemDescription;
  //       }),
  //       image: cart.cartItems.map((item) => {
  //         return item.image;
  //       }),

  //       user: localStorage.getItem("userId"),
  //     })
  //     .catch((err) => console.log(err));
  //   const data = res.data;
  //   console.log(data);
  //   return data;
  // };

  const handleSubmit = (e) => {
    nav("/shipping");
  };

  const handleRemove = (item) => {
    dispatch(removerFromCart(item));
  };

  // const refreshToken = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/api/refresh", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/api/user", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };
  // useEffect(() => {
  //   if (firstRender) {
  //     firstRender = false;
  //     sendRequest().then((data) => setUser(data.user));
  //   }
  //   let interval = setInterval(() => {
  //     refreshToken().then((data) => setUser(data.user));
  //   }, 1000 * 29);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="container pt-1">
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <div>
        <h2 className="pt-3">Order Summary</h2>
        <Row>
          <Col>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping Address</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {shippingAddress.registers.firstname}{" "}
                  {shippingAddress.registers.lastname}
                  <br />
                  <strong>Address:</strong> {shippingAddress.registers.address1}{" "}
                  {shippingAddress.registers.address2}{" "}
                  {shippingAddress.registers.address3}
                </Card.Text>
                <Link to="/shipping">Edit</Link>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> 
                </Card.Text>
                <Link to="/Payment">Edit</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h4 className="my-4">
          Your Cart Items {cartItems.length} and Qty{" "}
          {cartItems.reduce((a, c) => a + c.quantity, 0)}
        </h4>
      </div>
      <Row>
        <Col md={9}>
          <div style={{ backgroundColor: "#FFFFFF" }}>
            <div>
              <Table striped className="my-4">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th colSpan={3}>Description</th>
                    <th style={{ textAlign: "center" }}>Price</th>
                    <th style={{ textAlign: "center" }}>Qty</th>
                    <th style={{ textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            style={{ width: "4rem" }}
                            src={item.image}
                            alt=""
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>
                          <Button
                            variant="danger"
                            className="btn btn-sm"
                            onClick={() => handleRemove(item)}
                          >
                            X
                          </Button>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          &#x20B9; {item.itemPrice}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <span className="mx-2">{item.quantity}</span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          ${item.itemPrice * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div className="col-md-5 my-4">
                {/* <Button
            variant="outline-danger"
            className="text-left btn"
            onClick={cartClear}
          >
            <strong>Clear Cart</strong>
          </Button> */}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="demo-content">
                  {/* <Button
                variant="outline-warning"
                className="text-left btn"
                onClick={cntShop}
                >
                <strong>&#x2190;Continue Shopping</strong>
            </Button> */}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          {" "}
          <div className="col-md-15 text-left mt-4">
            <div className="demo-content bg-alt">
              Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
              : &#x20B9;{" "}
              {cartItems.reduce((a, c) => a + c.itemPrice * c.quantity, 0)}
            </div>
          </div>
          <div className="col-md-15 text-left">
            <div className="demo-content bg-alt">
              Tax: &#x20B9; {Math.floor(text)}
            </div>
          </div>
          <div className="col-md-15 text-left">
            <div className="demo-content bg-alt">
              {cartItems.reduce((a, c) => a + c.itemPrice * c.quantity, 0) >
              10000 ? (
                <div className="col-md-15 text-left">
                  <div className="demo-content bg-alt">
                    Grand Total: &#x20B9; {Math.floor(final)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="col-md-15 text-left">
                    <div className="demo-content bg-alt">
                      Shipping Charge: &#x20B9; 100
                      <br />
                      Grand Total: &#x20B9; {Math.floor(final + 100)}
                    </div>
                  </div>
                </>
              )}
              <div className="text-left my-4">
                <Button variant="warning" size="md" onClick={handleSubmit}>
                  Your Total Amount <b>&#x20B9;{Math.floor(final)}</b> to Pay
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Finalpayment;
