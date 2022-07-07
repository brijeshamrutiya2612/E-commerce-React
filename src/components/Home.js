import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import logger from "use-reducer-logger";

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

function Home() {
  const [{ loading, error, getProd }, dispatch] = useReducer(logger(reducer), {
    getProd: [],
    loading: true,
    error: "",
  });
  const [search, setSearch] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data.products });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };

  return (
    <>
      <div
        style={{
          
          
        }}
      >
        {loading ? (
          <div className="container pt-5">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div>
              <div
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "auto",
                  height: "auto",
                }}
              >
                <h3
                  className="p-4 d-flex justify-content-center"
                  style={{
                    lineHeight: "2em",
                  }}
                >
                  Your Choice is in Our Place
                </h3>

                <Carousel
                  fade
                  style={{
                    boxShadow: "1px 1px 1px 18px #FFFFFF",
                    
                    borderRadius: "20px",
                    background:
                    "linear-gradient(246deg, rgba(0,0,0,1) 27%, rgba(226,156,40,1) 28%);",
                  }}
                  activeIndex={index}
                  onSelect={handleSelect}
                >
                  {getProd.map((item, i) => {
                    return (
                      <Carousel.Item
                        key={i}
                        style={{ height: "520px" }}
                        interval={2000}
                      >
                        <img
                          className="d-block w-10 mx-auto justify-content-center my-5"
                          style={{ height: "350px" }}
                          src={item.image}
                          alt={item.itemCategory}
                        />
                        <Carousel.Caption style={{ color: "black" }}>
                          <h3>{item.itemName}</h3>
                          <h3>{item.itemCategory.toUpperCase()}</h3>
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
                <div >
                  <div className="row">
                    {getProd.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="col-lg-2 ml-5 my-3 d-flex justify-content-center"
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
                                  style={{
                                    textAlign: "center",
                                    color: "black",
                                  }}
                                >
                                  {item.itemName}
                                </Card.Title>
                                <Card.Title
                                  style={{
                                    textAlign: "center",
                                    color: "black",
                                  }}
                                >
                                  &#x20B9; {item.itemPrice}
                                </Card.Title>
                                <Card.Text
                                  style={{
                                    textAlign: "center",
                                    color: "black",
                                  }}
                                >
                                  {item.itemCategory.toUpperCase()}
                                </Card.Text>
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
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
