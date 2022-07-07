import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
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

        // const Product = student.data.products;
        // const newProduct = Product.filter((p) => {
        //   return p.itemCategory == search;
        // });
        // setPro(newProduct);
        // console.log(newProduct);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, [search]);
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
            className="container d-flex"
            style={{
              lineHeight: "2em",
            }}
          >
            {search.toUpperCase()} Items ({search.length})
          </h3>
          <div className="container">
            <div className="row">
              {pro
                .filter((val) => {
                  if (search == "") {
                    return val;
                  } else if (
                    val.itemName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    let final = [{ val }];
                    console.log(final);
                    return final;
                  } else if (
                    val.itemCategory
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    let final = [{ val }];
                    console.log(final);
                    return final;
                  }
                })
                .map((val, i) => {
                  return (
                    <>
                      {val.length}
                      <Link key={i} to={`/Seller/${val._id}`}>
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
                              <Col xs={30} sm={4} md={4} className="col-lg-4 col-md-5 col-sm-6 my-3 d-flex justify-content-center">
                                <Card.Img
                                  variant="center"
                                  src={val.image}
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
                            <Button className="btn-sm" variant="dark">
                              Shop now &#x2192;
                            </Button>
                          </Card.Body>
                        </Card>
                      </Link>
                    </>
                  );
                })}
            </div>
          </div>
          <div className="container">
            <div className="row">
              {pro.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="col-lg-4 col-md-5 col-sm-6 my-3 d-flex justify-content-center"
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
                            {item.itemName.substring(0, 20)}
                          </Card.Title>
                          <Card.Title
                            style={{ textAlign: "center", color: "black" }}
                          >
                            &#x20B9; {item.itemPrice}
                          </Card.Title>
                          <Card.Text
                            style={{ textAlign: "center", color: "black" }}
                          >
                            {item.itemCategory.toUpperCase()}
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
    </>
  );
};
export default Search;
