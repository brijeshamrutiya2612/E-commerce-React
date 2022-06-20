import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../store/ProductsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { getProd } = useSelector((state) => state.products);
  // console.log(getProd);
  const [user, setUser] = useState();

  useEffect(() => {
    dispatch(getData());
  }, []);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "auto",
          height: "auto",
        }}
      >
        <h1 className="container p-3 d-flex justify-content-center">
          Welcome {user && user.firstname} to Mart
        </h1>
        <h3 className="container p-4 d-flex justify-content-center">
          Your Choice is in Our Place
        </h3>
        <Carousel
          style={{
            overflow: "hidden",
            boxShadow: "1px 1px 15px #343A40",
            margin: "25px",
            borderRadius: "20px",
            backgroundColor: "white",
          }}
          activeIndex={index}
          onSelect={handleSelect}
        >
          {getProd.map((item, i) => {
            return (
              <Carousel.Item key={i} style={{ height: "520px" }}>
                <img
                  className="d-block mx-auto d-flex justify-content-center"
                  style={{ height: "350px" }}
                  src={item.image}
                  alt={item.category}
                />
                <Carousel.Caption style={{ color: "black" }}>
                  <h3>{item.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <div className="container">
          <div className="row">
            {getProd.map((item, i) => {
              return (
                <div
                  key={i}
                  className="col-lg-4 col-md-5 col-sm-6 my-3 d-flex justify-content-center"
                >
                  <Link to={`/Seller/${item.id}`}>
                    <Card
                      className="card card-item"
                      key={i}
                      style={{
                        overflow: "hidden",
                        maxWidth: "500px",
                        boxShadow: "1px 1px 15px #343A40",
                        margin: "5px",
                        borderRadius: "20px",
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
                          {item.title.substring(0, 20)}
                        </Card.Title>
                        <Card.Title
                          style={{ textAlign: "center", color: "black" }}
                        >
                          $ {item.price}
                        </Card.Title>
                        <Card.Text
                          style={{ textAlign: "center", color: "black" }}
                        >
                          {item.description.substring(0, 20)}...
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
      </div>
    </div>
  );
};

export default Home;
