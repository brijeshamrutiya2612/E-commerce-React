import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreseCart,
  getTotals,
  removerFromCart,
} from "../store/CartSlice";
import Header from "./Header";
import axios from "axios";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Addtocart = () => {
  const isLoggedIn = useSelector((state) => state.userlogin.isLoggedIn);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const nav = useNavigate();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, []);

  const onMinus = (item) => {
    dispatch(decreseCart(item));
  };
  const onPlus = (item) => {
    dispatch(addToCart(item));
  };
  const handleRemove = (item) => {
    dispatch(removerFromCart(item));
  };

  const cartClear = () => {
    dispatch(clearCart());
  };
  const cntShop = () => {
    nav("/");
  };
  const payment = () => {
    nav("/finalPayment");
  };
  const login = () => {
    nav("/login");
  };

  return (
    <div>
      <div className="pl-5 pr-5" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="pt-4">
        <Button variant="outline-warning" className="btn" onClick={cntShop}>
          <strong>&#x2190;Continue Shopping</strong>
        </Button>
        </div>
        
          <h2 style={{textAlign:"center"}} className="pt-3 pb-5"><ShoppingBagIcon style={{fontSize:"100px",color:"#14657C"}}/> Your Cart</h2>
        
        <Table striped className="my-2">
          <thead>
            <tr>
              <th>Items {user && user.firstname}</th>
              <th colSpan={3}>Description</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Qty</th>
              <th style={{ textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <img style={{ width: "4rem" }} src={item.image} alt="" />
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
                  <td style={{ textAlign: "center" }}>${item.price}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      className="btn"
                      variant="light"
                      onClick={() => onMinus(item)}
                    >
                      -
                    </Button>
                    <span className="pl-2 pr-2">{item.cartQuantity}</span>
                    <Button
                      className="btn btn-sm"
                      variant="light"
                      onClick={() => onPlus(item)}
                    >
                      +
                    </Button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    ${item.price * item.cartQuantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="col-md-15 text-right">
          <div className="demo-content bg-alt pt-2">
          Subtotal: ${cart.cartTotalAmount}
          </div>
        </div>
        <div className="col-md-5 my-4">
          <Button
            variant="outline-danger"
            className="text-left btn"
            onClick={cartClear}
          >
            <strong>Clear Cart</strong>
          </Button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="demo-content">
              <Button
                variant="outline-warning"
                className="text-left btn"
                onClick={cntShop}
              >
                <strong>&#x2190;Continue Shopping</strong>
              </Button>
            </div>
          </div>
          <div className="col-md-6 text-right">
            <div className="demo-content bg-alt">
              {!isLoggedIn ? (
                <Button onClick={login} variant="success" className="btn">
                  Login
                </Button>
              ) : (
                <Button
                  onClick={payment}
                  variant="success"
                  className="text-right ml-6 btn col-md-15 lg"
                >
                  Procced to Payment
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addtocart;
