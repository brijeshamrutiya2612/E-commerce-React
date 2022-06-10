import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdds } from "../redux/reducers/homeReducer";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const todoState = useSelector((state) => state.home);
  const { products } = todoState;

//    useEffect(() => {
//      dispatch(getAdds());
//  });

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Header />
      <Carousel  style={{
                    overflow: "hidden",
                    boxShadow: "1px 1px 15px #343A40",
                    margin: "25px",
                    borderRadius: "20px",
                  }} activeIndex={index} onSelect={handleSelect}>
        {products.map((item, i) => {
          return (
            <Carousel.Item style={{height:"520px"}}>
              <img
                className="d-block w-10 mx-auto d-flex justify-content-center"
                style={{height:"350px"}}
                src={item.image}
                alt="First slide"
              />
              <Carousel.Caption style={{color:"black"}}>
                <h3>{item.title}</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="container">
        <h3>Your Choice is in Our Place</h3>
        <div className="row">
          {products.map((item, i) => {
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
      <Footer/>
    </>
  );
};

export default Home;

// const [student, setStudents] = useState([]);
// async function getAllStudent() {
//   try {
//     const student = await axios.get("https://fakestoreapi.com/products/");
//     setStudents(student.data);
//   } catch (error) {
//     console.log("Problem");
//   }
// }
// getAllStudent();
{
  /* {prop.student.map((res)=>{
return(
  <p>{res.title}</p>
)
} */
}
