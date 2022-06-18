import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../store/ProductsSlice";

axios.defaults.withCredentials = true;
const Home = () => {
  let firstRender = true;
  const dispatch = useDispatch();
  const {getProd} = useSelector(state=>state.products)
  
  const [user, setUser] = useState();
 

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    dispatch(getData())
     if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);

    return () => clearInterval(interval);
  }, []);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: "#AFC7D3",
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
                  src={item.url}
                  alt={item.category}
                />
                <Carousel.Caption style={{ color: "black" }}>
                  <h3>{item.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        {/* <div className="container">
          <div className="row">
            {users.map((item, i) => {
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
        </div> */}
      </div>
    </div>
  );
};

export default Home;
