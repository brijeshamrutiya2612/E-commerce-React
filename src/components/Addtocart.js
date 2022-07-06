import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Store } from "../store/Context";
import axios from "axios";
import CheckOutSteps from "./CheckOutSteps";

const Addtocart = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo
  } = state;
  const nav = useNavigate();
  const onPlus = async (item,quantity) => {
    const student = await axios.get(
      `http://localhost:5000/api/products/${item._id}`,
    );
    console.log(student.data.products.itemQty)
    if(student.data.products.itemQty < quantity){
      window.alert('Sorry, Products is out of stock');
      return;
    }
    ctxDispatch({type:'CART_ADD_ITEM', payload: {...item, quantity},})
    // dis(addToCart(item));
  };
  const payment = () => {
    nav("/shipping");
  };
  const login = () => {
    nav("/login");
  };
  

  return (
    <div>
      <CheckOutSteps step1></CheckOutSteps>
      <div className="pl-5 pr-5 my-4" style={{ backgroundColor: "#FFFFFF" }}>
        <div>
          <Button variant="outline-success" className="btn">
            <strong>&#x2190;Continue Shopping</strong>
          </Button>
        </div>

        <h2 style={{ textAlign: "center" }} className="pt-3 pb-5">
          <ShoppingBagIcon style={{ fontSize: "50px", color: "#14657C" }} />{" "}
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <Typography textAlign="center" variant="h4">
            "Cart is Empty"
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell colSpan={3}>Item Description</TableCell>
                    <TableCell>Item Price</TableCell>
                    <TableCell>Item Qty</TableCell>
                    <TableCell align="right">Item Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, i) => {
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
                        <TableCell
                          align="left"
                          style={{
                            width: "100px",
                            float: "left",
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
                              marginRight: "12px",
                            }}
                            className="img-fluid"
                            src={item.image}
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="left">
                          <b>{item.itemName}</b>
                          <br />
                          <b>{item.itemDescription}</b>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            variant="danger"
                            className="btn btn-sm"
                            
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          &#x20B9;{item.itemPrice}
                        </TableCell>
                        <TableCell align="left">
                          <Button variant="light" onClick={()=> onPlus(item, item.quantity - 1)}>
                            <i className="fas fa-minus-circle"></i>
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button variant="light" onClick={() => onPlus(item, item.quantity + 1)}>
                            <i className="fas fa-plus-circle"></i>
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          &#x20B9;{item.itemPrice * item.quantity}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="col-md-15 text-right">
              <div className="demo-content bg-alt pt-2">
                Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                items) : &#x20B9;{" "}
                {cartItems.reduce((a, c) => a + c.itemPrice * c.quantity, 0)}
              </div>
            </div>
          </>
        )}
        <div className="col-md-5 my-4">
          <form>
          <Button
            variant="outline-danger"
            className="text-left btn"
          >
            <strong>Clear Cart</strong>
          </Button>
          </form>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="demo-content">
              <Button
                variant="outline-success"
                className="text-left btn"
              >
                <strong>&#x2190;Continue Shopping</strong>
              </Button>
            </div>
          </div>
          <div className="col-md-6 text-right">
            <div className="demo-content bg-alt">
               {!userInfo ? (
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
