import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Finalpayment = () => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const tax = (cart.cartTotalAmount * 23) / 100;
  const gTotal = cart.cartTotalAmount + tax;
  // useEffect(() => {
  //     dispatch(getTotals());
  //   }, [cart]);

  
  const successInfo = () =>{
    
  }
  return (
    <div>
      <div>
        <div className="container">
          <div className="my-5">
            <h2 className="container">Final Payment</h2>
            <h4 className="container my-4">Your Cart Items</h4>
          </div>
          {/* <Button variant="outline-warning" className="btn" onClick={cntShop}>
          <strong>&#x2190;Continue Shopping</strong>
        </Button> */}
          <Table striped className="my-4">
            <thead>
              <tr>
                <th>Items</th>
                <th colSpan={2}>Description</th>
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
                    {/* <td>
                    <Button
                      variant="danger"
                      className="btn btn-sm"
                      onClick={() => handleRemove(item)}
                    >
                      X
                    </Button>
              </td>*/}
                    <td style={{ textAlign: "center" }}>${item.price}</td>
                    <td style={{ textAlign: "center" }}>
                      <span className="mx-2">{item.cartQuantity}</span>
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
          {/* {user.map((item) => {
            return <p>{item.name}</p>;
          })} */}
          <div className="col-md-10 col-lg-15">
            <Button variant="success" size="lg" onClick={successInfo}>
              ${Math.floor(gTotal)} Payment
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
