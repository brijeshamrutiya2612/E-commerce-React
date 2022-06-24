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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

        <h2 style={{ textAlign: "center" }} className="pt-3 pb-5">
          <ShoppingBagIcon style={{ fontSize: "100px", color: "#14657C" }} />{" "}
          Your Cart
        </h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell colSpan={2}>Item Description</TableCell>
                <TableCell>Item Price</TableCell>
                <TableCell>Item Qty</TableCell>
                <TableCell align="right">Item Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((item, i) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="left">
                      <img
                        style={{
                          minWidth: "100px",
                          maxWidth: "200px",
                        }}
                        src={item.image}
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="danger"
                        className="btn btn-sm"
                        onClick={() => handleRemove(item)}
                      >
                        X
                      </Button>
                    </TableCell>
                    <TableCell align="left">&#x20B9;{item.itemPrice}</TableCell>
                    <TableCell align="left">
                      <Button
                        className="btn btn-sm"
                        onClick={() => onMinus(item)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.cartQuantity}</span>
                      <Button
                        className="btn btn-sm"
                        onClick={() => onPlus(item)}
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      &#x20B9;{item.itemPrice * item.cartQuantity}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="col-md-15 text-right">
          <div className="demo-content bg-alt pt-2">
            Subtotal: &#x20B9;{cart.cartTotalAmount}
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
