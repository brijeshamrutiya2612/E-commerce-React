import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, decreseCart } from "../redux/reducers/cartReducer";
import Header from "./Header";

const Addtocart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const nav = useNavigate();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [plus, setPlus] = useState();

  const onMinus = (item) => {
    dispatch(decreseCart(item));
  };
  const onPlus = (item) => {
    dispatch(addToCart(item));
  };
  const cntShop = () => {
    nav("/");
  };
  return (
    <div>
      <Header />
      <div className="container">
        <div className="container col-md-5 my-5">
          <h2 className="container">Your Cart Is Ready</h2>
        </div>
        <Table striped className="my-4">
          <thead>
            <tr>
              <th colSpan={8}>
                <Button
                  variant="outline-warning"
                  className="btn"
                  onClick={cntShop}
                >
                  <strong>&#x2190;Continue Shopping</strong>
                </Button>
              </th>
            </tr>
            <tr>
              <th>Items</th>
              <th colSpan={3}>Description</th>
              <th style={{ textAlign: "right" }}>Price</th>
              <th style={{ textAlign: "center" }}>Qty</th>
              <th style={{ textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <img style={{ width: "4rem" }} src={item.image} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <Button variant="danger" className="btn btn-sm">
                      X
                    </Button>
                  </td>
                  <td style={{ textAlign: "right" }}>${item.price}</td>
                  <td>
                    <Button className="btn btn-sm" onClick={() => onMinus(item)}>
                      -
                    </Button>
                    <span className="mx-2">{item.cartQuantity}</span>
                    <Button className="btn btn-sm" onClick={() => onPlus(item)}>+</Button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    ${item.price * item.cartQuantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="container col-md-5 my-5">
          <div className="container my-3"></div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="demo-content">
              <Button
                variant="outline-warning"
                className="text-left btn"
                onClick={cntShop}
              >
                <strong>&#x2190;Continue Shopping</strong>
              </Button>
            </div>
          </div>
          <div class="col-md-6 text-right">
            <div class="demo-content bg-alt">
              {user ? (
                <Button variant="success" className="text-right ml-6 btn">
                  Procced to Payment
                </Button>
              ) : (
                <Button variant="success" className="btn">
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Addtocart;
