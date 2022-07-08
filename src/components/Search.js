import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import "./Home.css";

const Search = () => {
  const [pro, setPro] = useState([]);
  const { search } = useParams([]);
  useEffect(() => {
    async function getAllStudent() {
      try {
        const student = await axios.get("http://localhost:5000/api/products");
        setPro(student.data.products);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, []);
  if (pro.isLoaded) {
    <p>Loading...</p>;
  }
  const mediaTypes = pro
    .map((dataItem) => dataItem.itemCategory) // get all media types
    .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates

  const counts = mediaTypes.map((mediaType) => ({
    type: mediaType,
    count: pro.filter((item) => item.itemCategory === mediaType).length,
  }));
  return (
    <>
      <div className="my-4">
        <div
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "auto",
            height: "auto",
          }}
        >
          <h3
            className="container d-flex"
            style={{
              lineHeight: "2em",
            }}
          ></h3>
          <div className="container">
            <Typography variant="h4" className="my-4">Result</Typography>
            <div className="row pl-5">
              {pro
                .filter((itm) => {
                  if (search == "") {
                    return itm;
                  } else if (
                    itm.itemName.toLowerCase().includes(search.toLowerCase())
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
                      <div
                        key={i}
                        className="pl-5 my-3 d-flex justify-content-center"
                      >
                        <Link to={`/Seller/${val._id}`}>
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
    </>
  );
};
export default Search;
