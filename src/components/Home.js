import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
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
      <div>
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
                      <Link key={i} to={`/Seller/${item._id}`}>
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
                      </Link>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>

                <div className="my-4">
                  <Form className="d-flex col-lg-3 mx-auto mb-5">
                    <Form.Control
                      type="search"
                      placeholder="Search by product, category..."
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form>
                  <div
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      width: "auto",
                      height: "auto",
                    }}
                  >
                    <div>
                      <div className="row pl-5">
                        {getProd
                          .filter((itm) => {
                            if (search == "") {
                              return itm;
                            } else if (
                              itm.itemName
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              let final = [{ itm }];
                              return final;
                            } else if (
                              itm.itemCategory
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              let final = [{ itm }];
                              return final;
                            }
                          })
                          .map((val, i) => {
                            return (
                              <>
                                <div className="col-lg-15 ml-5 my-3 d-flex justify-content-center">
                                  <Link key={i} to={`/Seller/${val._id}`}>
                                    <Card
                                      className="card card-item"
                                      key={i}
                                      style={{
                                        overflow: "hidden",
                                        width: "300px",
                                        maxWidth: "500px",
                                        boxShadow: "1px 1px 15px #343A40",
                                        transitionDuration: "1s",
                                      }}
                                    >
                                      <Container>
                                        <Row>
                                          <Col
                                            style={{
                                              height: "200px",
                                              minHeight: "170px",
                                              width: "150px",
                                              maxHeight: "550px",
                                              marginTop: "1em",
                                              textAlign: "center",
                                            }}
                                          >
                                            <Card.Img
                                              src={val.image}
                                              style={{
                                                maxHeight: "250px",
                                                height: "auto",
                                                width: "auto",
                                                maxWidth: "200px",
                                                textAlign: "center",
                                              }}
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="mt-5">
                                          <Col
                                            style={{
                                              height: "200px",
                                              textAlign: "center",
                                            }}
                                          >
                                            <Card.Body
                                              style={{
                                                textAlign: "center",
                                                color: "black",
                                              }}
                                            >
                                              <Card.Title
                                                style={{
                                                  textAlign: "center",
                                                  color: "black",
                                                }}
                                              >
                                                {val.itemName.substring(0, 20)}
                                              </Card.Title>
                                              <Card.Title
                                                style={{
                                                  textAlign: "center",
                                                  color: "black",
                                                }}
                                              >
                                                &#x20B9; {val.itemPrice}
                                              </Card.Title>
                                              <Card.Text
                                                style={{
                                                  textAlign: "center",
                                                  color: "black",
                                                }}
                                              >
                                                {val.itemCategory.toUpperCase()}
                                              </Card.Text>
                                              <Button
                                                className="btn-sm btn-c"
                                                variant="dark"
                                              >
                                                Shop now &#x2192;
                                              </Button>
                                            </Card.Body>
                                          </Col>
                                        </Row>
                                      </Container>
                                    </Card>
                                  </Link>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
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
