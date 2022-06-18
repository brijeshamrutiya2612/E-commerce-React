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
import axios from 'axios';

let firstRender = true;
const Addtocart = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
    const nav = useNavigate();
    const cart = useSelector((state) => state.cart);


    
    useEffect(() => {
      dispatch(getTotals());
    }, []);
  const refreshToken = async () =>{
    const res = await axios.get("http://localhost:5000/api/refresh", {
      withCredentials: true,
    }).catch(err => console.log(err))
    const data = await res.data
    return data;
  }


  const sendRequest = async () =>{
    const res = await axios.get("http://localhost:5000/api/user",{
      withCredentials: true
    }).catch(err => console.log(err))
    const data = await res.data
    return data;
  }

  useEffect(() => {
    if(firstRender){
      firstRender = false
      sendRequest().then((data)=> setUser(data.user));
    }
    let interval = setInterval(()=>{
      refreshToken().then(data=>setUser(data.user))
    },1000 * 29)
    
    
    return ()=>clearInterval(interval)
  },[]);


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
      <div className="container">
        <div className="my-5">
          <h2 className="container">Your Cart Is Ready</h2>
        </div>
        <Button variant="outline-warning" className="btn" onClick={cntShop}>
          <strong>&#x2190;Continue Shopping</strong>
        </Button>
        <Table striped className="my-4">
          <thead>
            <tr>
              <th>Items {user && user.firstname}</th>
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
                      className="btn btn-sm"
                      onClick={() => onMinus(item)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.cartQuantity}</span>
                    <Button className="btn btn-sm" onClick={() => onPlus(item)}>
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
          <div className="demo-content bg-alt">
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
                <Button onClick={payment} variant="success" className="text-right ml-6 btn col-md-15 lg">
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
