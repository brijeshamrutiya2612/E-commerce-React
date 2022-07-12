import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import {getError} from '../utils';
import "./Home.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return{...state, loading: true};
      case 'FETCH_SUCCESS':
        return{
          ...state,
          products: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          countProducts: action.payload.countProducts,
          loading: false,
        };
        case 'FETCH_FAIL':
        return{...state, loading: false, error: action.payload};

        default:
          return state;
  }
};

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  }
]
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
      <div>
        <div
          style={{
            background: "#D8E4E6",
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
          <Row>
            <Col md={3}></Col>
            <Col>
              <Typography variant="h5" className="my-4">
                Search Result '{search.toUpperCase()}'
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col style={{background:"white", height:"350px"}} md={2} className="pl-5">
              <Typography variant="h6">
                Price
              </Typography>
              <p>&#x20B9; 100 - &#x20B9; 500</p>
              <p>&#x20B9; 500 - &#x20B9; 1000</p>
              <p>&#x20B9; 1000 - &#x20B9; above</p>
              <Typography variant="h6">
                Rating
              </Typography>
              <Rating ratingValue={4.5 * 20} size={20}></Rating>
              <br />
              <Rating ratingValue={3.5 * 20} size={20}></Rating>
              <br />
              <Rating ratingValue={2.5 * 20} size={20}></Rating>
              <br />
              <Rating ratingValue={1.5 * 20} size={20}></Rating>
            </Col>
            <Col>
              <div className="row pl-2">
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
                        <div className="col-lg-15 ml-5 my-2 mb-5">
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
            </Col>
          </Row>
          <div></div>
        </div>
      </div>
    </>
  );
};
export default Search;