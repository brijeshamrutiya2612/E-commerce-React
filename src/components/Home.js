import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../store/ProductsSlice";
import Footer from "./Footer";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const dispatch = useDispatch();
  const { getProd } = useSelector((state) => state.products);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  useEffect(() => {
    if (componentMounted) {
      dispatch(getData());
      setUser(getProd)
      setLoading(false);
    }
    return () => {
      componentMounted = false;
    };
  }, []);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
 
  const ShowProducts = () =>{
    return(
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
          className="container p-4 d-flex justify-content-center"
          style={{
            lineHeight: "2em",
          }}
        >
          Your Choice is in Our Place
        </h3>
        {getProd.map((item, i) => {
          return <p>{item.title}</p>;
        })}
        <Carousel
          style={{
            overflow: "hidden",
            boxShadow: "1px 1px 1px 18px #FFFFFF",
            margin: "25px",
            borderRadius: "20px",
            background: "linear-gradient(180deg, rgba(63,94,251,1) 0%, rgba(70,252,222,1) 100%)"
          }}
          activeIndex={index}
          onSelect={handleSelect}
        >
          {getProd.map((item, i) => {
              return (
                <Carousel.Item key={i} style={{ height: "520px" }}>
                <img
                className="d-block mx-auto d-flex justify-content-center my-5"
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
          <div className="container">
            <div className="row">
              {getProd.map((item, i) => {
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
                            {item.itemName}
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
    )
  }
  return (
    <>
    {loading ? <Loading/> : <ShowProducts/>}
    </>    
  );
};

export default Home;
