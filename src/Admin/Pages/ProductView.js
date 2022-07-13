import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import logger from "use-reducer-logger";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
} from "@mui/material";
import Admin from "../Admin";
import Header from "./Header";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Store } from "../../store/Context";
import { toast } from "react-toastify";


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

function ProductView() {
  const [{ loading, error, getProd }, dispatch] = useReducer(logger(reducer), {
    getProd: [],
    loading: true,
    error: "",
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo
  } = state;
  const navigate = useNavigate();
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

  const addProduct = () => {
    navigate("/addproducts");
  };

  const {id} = useParams();

  useEffect(()=>{
      const deleteProduct = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
          } catch (err) {
            toast.error(err)
          }
      };
      deleteProduct();
  },[])

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
            <div
              style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "auto",
                height: "auto",
              }}
            >
              <Admin></Admin>
              <div className="my-4" style={{ background: "#D8E4E6" }}>
                <div className="pt-3">
                  <Form className="d-flex col-lg-3 mx-auto mt-5">
                    <Form.Control
                      type="search"
                      placeholder="Search by product, category..."
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form>
                </div>
                <div>
                  <div>
                    {search == "" ? (
                      <>
                        <div className="ml-5 my-4">
                          <div className="col-lg-11 ml-5 my-4">
                            <Typography style={{ float: "left" }} variant="h4">
                              MEN
                            </Typography>
                            <AddBoxOutlinedIcon
                              onClick={addProduct}
                              className="mr-4"
                              style={{ float: "right" }}
                            />
                          </div>
                        </div>
                        <div className="row ml-5">
                          {getProd
                            .filter((itm) => {
                              if (itm.itemCategory === "men's clothing") {
                                return itm;
                              }
                            })
                            .map((val, i) => {
                              return (
                                <>
                                  <div className="col-lg-15 ml-5 my-5">
                                    <Card
                                      className="card card-item"
                                      key={i}
                                      style={{
                                        overflow: "hidden",
                                        width: "250px",
                                        maxWidth: "500px",
                                        background: "#FFFFFF",
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
                                            </Card.Body>
                                          </Col>
                                        </Row>
                                        <BottomNavigation
                                          showLabels
                                          // value={value}
                                          // onChange={(
                                          //   event,
                                          //   newValue
                                          // ) => {
                                          //   setValue(newValue);
                                          // }}
                                        >
                                          <Link
                                            key={i}
                                            to={`/productAction/${val._id}`}
                                          >
                                            <BottomNavigationAction
                                              label="Edit"
                                              icon={<EditIcon />}
                                            />
                                          </Link>
                                          <Link to={`/productview/${val._id}`}>
                                          <BottomNavigationAction
                                            icon={<DeleteIcon />}
                                          />
                                          </Link>
                                        </BottomNavigation>
                                      </Container>
                                    </Card>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                        <div className="mb-3">
                          <div className="col-lg-11 ml-5 my-4">
                            <Typography style={{ float: "left" }} variant="h4">
                              WOMEN
                            </Typography>
                            <AddBoxOutlinedIcon
                              className="mr-4"
                              style={{ float: "right" }}
                            />
                          </div>
                        </div>
                        <div className="row ml-5 mt-5">
                          {getProd
                            .filter((itm) => {
                              if (itm.itemCategory === "women's clothing") {
                                return itm;
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
                                          width: "250px",
                                          maxWidth: "500px",
                                          background: "#FFFFFF",
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
                                                  {val.itemName.substring(
                                                    0,
                                                    20
                                                  )}
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
                        <div>
                          <div className="col-lg-11 my-4">
                            <Typography style={{ float: "left" }} variant="h4">
                              JEWELERY
                            </Typography>
                            <AddBoxOutlinedIcon
                              className="mr-4"
                              style={{ float: "right" }}
                            />
                          </div>
                        </div>
                        <div className="row ml-5">
                          {getProd
                            .filter((itm) => {
                              if (itm.itemCategory === "jewelery") {
                                return itm;
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
                                          width: "250px",
                                          maxWidth: "500px",
                                          background: "#FFFFFF",
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
                                                  {val.itemName.substring(
                                                    0,
                                                    20
                                                  )}
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
                        <div className="ml-5">
                          <div className="col-lg-11 my-4">
                            <Typography style={{ float: "left" }} variant="h4">
                              SPORTS
                            </Typography>
                            <AddBoxOutlinedIcon
                              className="mr-4"
                              style={{ float: "right" }}
                            />
                          </div>
                        </div>
                        <div className="row ml-5">
                          {getProd
                            .filter((itm) => {
                              if (itm.itemCategory === "Sports") {
                                return itm;
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
                                          width: "250px",
                                          maxWidth: "500px",
                                          background: "#FFFFFF",
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
                                                  {val.itemName.substring(
                                                    0,
                                                    20
                                                  )}
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
                        <div className="ml-5">
                          <div className="col-lg-11 my-4">
                            <Typography style={{ float: "left" }} variant="h4">
                              FOODS
                            </Typography>
                            <AddBoxOutlinedIcon
                              className="mr-4"
                              style={{ textAlign: "right" }}
                            />
                          </div>
                        </div>
                        <div className="row ml-5 mt-5">
                          {getProd
                            .filter((itm) => {
                              if (itm.itemCategory === "Food") {
                                return itm;
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
                                          width: "250px",
                                          maxWidth: "500px",
                                          background: "#FFFFFF",
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
                                                  {val.itemName.substring(
                                                    0,
                                                    20
                                                  )}
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
                        <div className="ml-5">
                          <div className="col-lg-11 ml-5 my-4">
                            <Typography style={{ float: "left" }} variant="h4">
                              ELECTRONICS
                            </Typography>
                            <AddBoxOutlinedIcon
                              className="mr-4"
                              style={{ float: "right" }}
                            />
                          </div>
                        </div>
                        <div className="row ml-5">
                          {getProd
                            .filter((itm) => {
                              if (itm.itemCategory === "electronics") {
                                return itm;
                              }
                            })
                            .map((val, i) => {
                              return (
                                <>
                                  <div className="col-lg-15 ml-5 my-5 d-flex justify-content-center">
                                    <Link key={i} to={`/Seller/${val._id}`}>
                                      <Card
                                        className="card card-item"
                                        key={i}
                                        style={{
                                          overflow: "hidden",
                                          width: "250px",
                                          maxWidth: "500px",
                                          background: "#FFFFFF",
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
                                                  {val.itemName.substring(
                                                    0,
                                                    20
                                                  )}
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
                      </>
                    ) : (
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
                                        width: "250px",
                                        maxWidth: "500px",
                                        background: "#FFFFFF",
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
                    )}
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

export default ProductView;
