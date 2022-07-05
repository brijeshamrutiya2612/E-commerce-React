import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Card, Col, ListGroup, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../store/Context";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const OrderScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);
  return (
    <>
      <p>Hello</p>
      <div>
        <h1 className="my-3">Order {orderId}</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping Address</Card.Title>
                <Card.Text>
                  <strong>Name:</strong>{" "}
                  {/* {order.shippingAddress.firstname}{" "}
                  {order.shippingAddress.lastname}
                  <br />
                  <strong>Address:</strong>{" "}
                  {order.shippingAddress.address1}{" "}
                  {order.shippingAddress.address2}{" "}
                  {order.shippingAddress.address3} */}
                </Card.Text>
                {order.isDelivered ? (
                  <Box variant="success">Delivered at {order.deliveredAt}</Box>
                ) : (
                  <Box variant="danger">Not Delivered</Box>
                )}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {order.paymentMethod}
                </Card.Text>
                {order.isPaid ? (
                  <Box variant="success">Paid at {order.paidAt}</Box>
                ) : (
                  <Box variant="danger">Not Paid</Box>
                )}
              </Card.Body>
            </Card>{" "}
            {/* Your Cart Items {order.orderItems.length} and Qty{" "}
            {order.orderItems.reduce((a, c) => a + c.quantity, 0)} */}
            <Table striped className="my-4">
              <thead>
                <tr>
                  <th>Items</th>
                  <th colSpan={2}>Description</th>
                  <th style={{ textAlign: "center" }}>Price</th>
                  <th style={{ textAlign: "center" }}>Qty</th>
                  <th style={{ textAlign: "right" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, i) => {
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
                      <td>
                        <strong>{item.itemName}</strong>
                        <br />
                        {item.itemDescription}
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
          </Col>
          <Col md={4}>
            <Card className="">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Order Total</Col>
                      <Col>${order.totalPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderScreen;
