import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Header from "./Header";
import { useDispatch,useSelector } from "react-redux";
import "./Home.css";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { addToCart } from "../store/CartSlice";
import { getData } from "../store/ProductsSlice";

const Seller = (prop) => {
  const [student, setStudents] = useState([]);
  const [rate, setRate] = useState([]);
  const [all, setAll] = useState([]);
  const { id } = useParams();
  const final = useNavigate();
  const dispatch = useDispatch();
   const { getProd } = useSelector((state) => state.products);
  // console.log(getProd);
  const [user, setUser] = useState();

  useEffect(() => {
    dispatch(getData());
    async function getAllStudent() {
      try {
        const student = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        console.log(student)
        setStudents(student.data.products);

        const rate = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        setRate(rate.data.rating);

        const all = await axios.get("http://localhost:5000/api/products/");
        setAll(all.data.products);

        const Product = all;
        const newProduct = Product.filter((p) => {
          return p.data.products.itemCategory == student.data.products.itemCategory;
        });
        setAll(newProduct);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, [id]);

  const send = (student) => {
    dispatch(addToCart(student));
  };
  const finalBuy = () => {
    dispatch(addToCart(student));
    final("/Addtocart");
  };
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div
        className="container d-flex"
        style={{
          backgroundColor: "white",
          paddingTop: "2em",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="row">
          <div className="d-flex justify-content-center" style={{width:"35rem"}}>
            <Card className="card" style={{ border: "none"}}>
              <Card.Img
                variant="top"
                className="card-item"
                style={{
                  maxHeight: "400px",
                  width: "auto",
                  maxWidth: "500px",
                  minWidth: "100px",
                }}
                src={student.image}
              />
            </Card>
          </div>

          <div key={student._id} className="col justify-content-center">
            <h2>
              <u>{student.itemName}</u>
            </h2>
            {/* <Rating ratingValue={rate.rate * 20} size={20}></Rating> */}
            {/* <small style={{ marginTop: "10px" }}> ({rate.count}) Rating</small> */}
            <p>Price: ${student.itemPrice}</p>
            <p>Category: {student.itemCategory}</p>
            <p>
              <b>Description:</b> {student.itemDescription}
            </p>
            <Button
              variant="warning"
              className="col mb-2 d-flex justify-content-center"
              onClick={() => send(student)}
            >
              <FaCartArrowDown className="my-1 d-flex justify-content-center" />
              &#x2003; Add to Cart
            </Button>
            <Button
              variant="success"
              className="col d-flex justify-content-center"
              onClick={() => finalBuy(student)}
            >
              <FaCartPlus className="my-1 d-flex justify-content-center" />
              &#x2003;&#x2003; Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="container col-lg-15">
          <h3 className="pt-5 pb-5 col-lg-5">Related Products</h3>
        <div className="row">
          
          
          {!all ? "No Related Data" : all.map((item, i) => {
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
                    <Card.Body style={{ textAlign: "center", color: "black" }}>
                      <Card.Title
                        style={{ textAlign: "center", color: "black" }}
                      >
                        {item.title}
                      </Card.Title>
                      <Card.Title
                        style={{ textAlign: "center", color: "black" }}
                      >
                        $ {item.price}
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", color: "black" }}
                      >
                        {item.category}
                      </Card.Text>
                      <Button className="btn-sm" variant="dark">
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



      <div className="">
          <h3 className="pt-5 pb-5 col-lg-5">Also may you like</h3>
        <div className="row">
          {getProd.map((item, i) => {
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
                        {item.title}
                      </Card.Title>
                      <Card.Title
                        style={{ textAlign: "center", color: "black" }}
                      >
                        $ {item.price}
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", color: "black" }}
                      >
                        {item.category}
                      </Card.Text>
                      <Button className="btn-sm" variant="dark">
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
    </>
  );
};

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
