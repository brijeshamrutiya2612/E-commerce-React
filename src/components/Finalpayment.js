import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTotals, removerFromCart } from "../store/CartSlice";
import { getData } from "../store/ProductsSlice";

// axios.defaults.withCredentials = true;
// let firstRender = true;

const Finalpayment = () => {
  const users = useSelector((state) => state.userlogin.isLoggedIn);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const cart = useSelector((state) => state.cart);
  const tax = (cart.cartTotalAmount * 23) / 100;
  const gTotal = cart.cartTotalAmount + tax;

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  useEffect(() => {
    dispatch(getData());
  }, []);
  let a = cart;
  console.log(a);
  console.log(cart.cartItems.map((item) => item.itemCategory));

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/userproducts/add", {
        
          itemCategory: cart.cartItems.map((item) =>{ return item.itemCategory}),
          itemName: cart.cartItems.map((item) =>{ return item.itemName}),
          itemPrice: cart.cartItems.map((item) =>{ return item.itemPrice}),
          itemQty: cart.cartItems.map((item) =>{ return item.itemQty}),
          itemUnit: cart.cartItems.map((item) =>{ return item.itemUnit}),
          itemDescription: cart.cartItems.map((item) =>{ return item.itemDescription}),
          image: cart.cartItems.map((item) =>{ return item.image}),
        
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data =  res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data));
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
    <div className="pt-1">
      <div className="pt-1 pl-5 pr-5" style={{ backgroundColor: "#FFFFFF" }}>
        <div>
          <div className="">
            <h2 className="pt-3">Final Payment </h2>
            <h4 className="my-4">
              Your Cart Items {cart.cartItems.length} and Qty{" "}
              {cart.cartTotalQuntity}
            </h4>
          </div>
          {/* <Button variant="outline-warning" className="btn" onClick={cntShop}>
          <strong>&#x2190;Continue Shopping</strong>
        </Button> */}
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
                    <td style={{ textAlign: "center" }}>
                      &#x20B9; {item.itemPrice}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span className="mx-2">{item.cartQuantity}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      ${item.itemPrice * item.cartQuantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="col-md-15 text-right">
            <div className="demo-content bg-alt">
              Subtotal: ${Math.floor(cart.cartTotalAmount)}
            </div>
          </div>
          <div className="col-md-15 text-right">
            <div className="demo-content bg-alt">
              Tax: ${Math.floor(tax)}
              <br />
              Grand Total: ${Math.floor(gTotal)}
            </div>
          </div>
          <div className="col-md-5 my-4">
            {/* <Button
            variant="outline-danger"
            className="text-left btn"
            onClick={cartClear}
          >
            <strong>Clear Cart</strong>
          </Button> */}
          </div>
          <h4 className="my-5">Shipping Address</h4>
          <p>{user && user.address1}</p>
          <p>{user && user.address2}</p>
          <p>{user && user.address3}</p>
          <div className="text-center">
            <Button variant="success" size="lg" onClick={handleSubmit}>
              Your Total Amount <b>&#x20B9;{Math.floor(gTotal)}</b> to Pay
            </Button>
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
    </div>
  );
};

export default Finalpayment;
