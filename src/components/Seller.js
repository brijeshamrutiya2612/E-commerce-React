import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { getData } from "../store/ProductsSlice";
import { Store } from "../store/Context";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, getProd: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Seller() {
  const [{ loading, error, getProd }, dispatch] = useReducer(reducer, {
    getProd: [],
    loading: true,
    error: "",
  });
  // const dispatch = useDispatch();
  // const { getProd } = useSelector((state) => state.products);
  // const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data.products });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [id]);
  const [student, setStudents] = useState([]);
  const [all, setAll] = useState([]);
  const final = useNavigate();
  

  useEffect(() => {
    dispatch(getData());
    async function getAllStudent() {
      try {
        const student = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setStudents(student.data.products);

        // const rate = await axios.get(
        //   `http://localhost:5000/api/products/${id}`,
        // );
        // setRate(rate.data.rating);

        const all = await axios.get("http://localhost:5000/api/products/");
        console.log(all.data.products);
        setAll(all.data.products);

        const Product = all.data.products;
        const newProduct = Product.filter((p) => {
          return p.itemCategory === student.data.products.itemCategory;
        });
        setAll(newProduct);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, [id]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const send = () => {
    const existItem = cart.cartItems.find((x) => x._id === getProd._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...getProd, quantity } });
  };
  const finalBuy = () => {
    const existItem = cart.cartItems.find((x) => x._id === getProd._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...getProd, quantity } });
    final("/addtocart");
  };
  return (
    <>
      {loading ? (
        <div className="container">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div
            className="container d-flex"
            style={{
              backgroundColor: "white",
              paddingTop: "2em",
            }}
          >
            <div className="row">
              <div
                className="d-flex justify-content-center"
                style={{ width: "35rem" }}
              >
                <Card className="card" style={{ border: "none" }}>
                  <Card.Img
                    variant="top"
                    className="card-item"
                    style={{
                      maxHeight: "400px",
                      width: "auto",
                      maxWidth: "500px",
                      minWidth: "100px",
                    }}
                    src={getProd.image}
                  />
                </Card>
              </div>

              <div key={getProd._id} className="col justify-content-center">
                <h2>
                  <u>{getProd.itemName}</u>
                </h2>
                {/* <Rating ratingValue={rate.rate * 20} size={20}></Rating> */}
                {/* <small style={{ marginTop: "10px" }}> ({rate.count}) Rating</small> */}
                <p>Price: &#x20B9;{getProd.itemPrice}</p>
                <p>Category: {getProd.itemCategory}</p>
                <p>
                  <b>Description:</b> {getProd.itemDescription}
                </p>
                {getProd.itemQty === 0 ? (
                  <Button variant="light" disabled>Out Of Stock</Button>
                ) : (
                  <Button
                    variant="warning"
                    className="col mb-2 d-flex justify-content-center"
                    onClick={send}
                  >
                    <FaCartArrowDown className="my-1 d-flex justify-content-center" />
                    &#x2003; Add to Cart
                  </Button>
                )}
                <Button
                  variant="success"
                  className="col d-flex justify-content-center"
                  onClick={finalBuy}
                >
                  <FaCartPlus className="my-1 d-flex justify-content-center" />
                  &#x2003;&#x2003; Buy Now
                </Button>
              </div>
            </div>
          </div>
          <div className="container col-lg-15" style={{ zIndex: 1 }}>
            <h3 className="pt-5 pb-5 col-lg-5">Related Products</h3>
            <div className="row">
              {!all
                ? "No Related Data"
                : all.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="col-lg-3 col-sm-6 my-3 d-flex justify-content-center"
                      >
                        <Link to={`/Seller/${item._id}`}>
                          <Card
                            className="card card-item"
                            key={i}
                            style={{
                              overflow: "hidden",
                              maxWidth: "500px",
                              boxShadow: "1px 1px 15px #343A40",
                              margin: "5px",
                              transitionDuration: "3s",
                            }}
                          >
                            <Container>
                              <Row>
                                <Col xs={30} sm={4} md={4}>
                                  <Card.Img
                                    variant="center"
                                    src={item.image}
                                    style={{
                                      marginTop: "1em",
                                      height: "250px",
                                      maxHeight: "250px",
                                      width: "300px",
                                      maxWidth: "200px",
                                      textAlign: "center",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Container>
                            <Card.Body
                              style={{ textAlign: "center", color: "black" }}
                            >
                              <Card.Title
                                style={{ textAlign: "center", color: "black" }}
                              >
                                {item.itemName}
                              </Card.Title>
                              <Card.Title
                                style={{ textAlign: "center", color: "black" }}
                              >
                                &#x20B9; {item.itemPrice}
                              </Card.Title>
                              <Button className="btn-sm btn-c" variant="dark">
                                  Shop now &#x2192;
                                </Button>
                            </Card.Body>
                          </Card>
                        </Link>
                      </div>
                    );
                  })}
            </div>
          </div>

          <div style={{ zIndex: 0 }}>
            <h3 className="d-flex pt-5 pb-5">Also may you like</h3>
            <div className="row">
              {/* {getProd.map((item, i) => {
            return (
              <div
                key={i}
                className="col-lg-3 col-sm-6 my-3 d-flex justify-content-center"
              >
                <Link to={`/Seller/${item._id}`}>
                  <Card
                    className="card card-item"
                    key={i}
                    style={{
                      overflow: "hidden",
                      maxWidth: "500px",
                      boxShadow: "1px 1px 15px #343A40",
                      margin: "5px",
                      transitionDuration: "3s",
                    }}
                  >
                    <Container>
                      <Row>
                        <Col xs={10} sm={4} md={4}>
                          <Card.Img
                            variant="center"
                            src={item.image}
                            style={{
                              marginTop: "1em",
                              height: "250px",
                              maxHeight: "250px",
                              width: "300px",
                              maxWidth: "200px",
                              textAlign: "center",
                            }}
                          />
                        </Col>
                      </Row>
                    </Container>
                    <Card.Body style={{ textAlign: "center", color: "black" }}>
                      <Card.Title
                        style={{ textAlign: "center", color: "black" }}
                      >
                        {item.itemName}
                      </Card.Title>
                      <Card.Title
                        style={{ textAlign: "center", color: "black" }}
                      >
                        &#x20B9; {item.itemPrice}
                      </Card.Title>
                      <Button className="btn-sm" variant="dark">
                        Shop now &#x2192;
                      </Button>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })} */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Seller;

// const [allRate, setAllRate] = useState([]);
// const aRate = await axios.get(
//   "https://fakestoreapi.com/products/"
// );
// setAllRate(aRate.data.rating);

// const rat = aRate.data;
// const newRat = rat.filter((p) => {
//   return (
//     p.rating == rate.data.rating
//   );
// });
// setAllRate(newRat);
