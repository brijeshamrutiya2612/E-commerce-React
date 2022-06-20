import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import "./Home.css";

const Search = () => {
  const [pro, setPro] = useState([]);
  const { search } = useParams();
  useEffect(() => {
    async function getAllStudent() {
      try {
        const student = await axios.get(
          `https://fakestoreapi.com/products/category/${search}`
        );
        setPro(student.data);
        console.log(student);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  });
  if (pro.isLoading) {
    <p>Loading...</p>;
  }
  console.log(search);
  return (
    <>
      <div className="container">
        <h3>Your Choice is in Our Place</h3>
        <div className="row">
          {pro.map((item, i) => {
            return (
              <div
                key={i}
                className="col-lg-4 col-md-5 col-sm-6 my-3 d-flex justify-content-center"
              >
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
                            marginTop:"1em"
,                            height: "250px",
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
                    <Card.Title style={{ textAlign: "center", color: "black" }}>
                      {item.title.substring(0, 20)}
                    </Card.Title>
                    <Card.Title style={{ textAlign: "center", color: "black" }}>
                      $ {item.price}
                    </Card.Title>
                    <Card.Text style={{ textAlign: "center", color: "black" }}>
                      {item.description.substring(0, 20)}...
                    </Card.Text>
                    <Link to={`/Seller/${item.id}`}>
                      <Button className="btn-sm" variant="dark">
                        Detail
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      {}
    </>
  );
};
export default Search;
