import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card,  Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Header from "./Header";
import { useDispatch } from "react-redux";
import "./Home.css";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { addToCart } from "../store/CartSlice";


const Seller = (prop) => {
  const [student, setStudents] = useState([]);
  const [rate, setRate] = useState([]);
  const [all, setAll] = useState([]);
  const { id } = useParams();
  const final = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getAllStudent() {
      try {
        const student = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setStudents(student.data);

        const rate = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setRate(rate.data.rating);

        const all = await axios.get("https://fakestoreapi.com/products/");
        setAll(all.data);

        const Product = all.data;
        const newProduct = Product.filter((p) => {
          return p.category == student.data.category;
        });
        setAll(newProduct);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, [id]);

  const send = (student) => {
     dispatch(addToCart(student));
  };
  const finalBuy = () =>{
    dispatch(addToCart(student));
    final("/Addtocart")
  }
  return (
    <>
      <div className="container my-5 d-flex">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6 my-3 d-flex justify-content-center">
            <Card className="card" style={{ border: "none", width: "20rem" }}>
              <Card.Img
                variant="top"
                className="card-item"
                style={{
                  height: "auto",
                  maxHeight: "250px",
                  width: "auto",
                  maxWidth: "500px",
                  minWidth: "100px",
                }}
                src={student.image}
              />
            </Card>
          </div>

          <div key={student.id} className="col justify-content-center" >
            <h5>
              <u>{student.title}</u>
            </h5>
            <Rating ratingValue={rate.rate * 20} size={20}></Rating>
            <small style={{ marginTop: "10px" }}> ({rate.count}) Rating</small>
            <p>Price: &#x20B9;{student.price}</p>
            <p>Category: {student.category}</p>
            <p>
              <b>Description:</b> {student.description}
            </p>
            <Button
              variant="warning"
              className="col-md-15 d-flex justify-content-center"
              onClick={() => send(student)}
            >
              <FaCartArrowDown className="my-1 d-flex justify-content-center" />&#x2003;
              Add to Cart
            </Button>
            <Button
              variant="success"
              className="col-md-15 my-3 d-flex justify-content-center"
              onClick={() => finalBuy(student)}
            >
              <FaCartPlus className="my-1 d-flex justify-content-center" />&#x2003;&#x2003;
              Buy Now
              
            </Button>
          </div>
        </div>
      </div>
      <div className="container my-5 d-flex">
        <div className="row">
          <Container style={{ borderTop: "1px solid" }}>
            <h3>Related Products</h3>
            {all.map((item) => {
              return (
                <>
                  <div key={item.id} className="container my-5 d-flex">
                    <Link
                      to={`/Seller/${item.id}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <div className="row">
                        <div className="my-3 justify-content-center">
                          <Card className="card" style={{border:"none"}}>
                            <Card.Img
                              variant="top"
                              style={{
                                overflow: "hidden",
                                maxWidth: "200px",
                                boxShadow: "1px 1px 15px #343A40",
                                margin: "5px",
                                borderRadius: "20px",
                                transitionDuration: "3s",
                              }}
                              src={item.image}
                            />
                          </Card>
                        </div>
                        <div className="col justify-content-center">
                          <h5>
                            <u>{item.title}</u>
                          </h5>
                          <Rating
                            ratingValue={item.rating.rate * 20}
                            size={20}
                          ></Rating>
                          <small style={{ marginTop: "10px" }}>
                            ({item.rating.count}) Rating
                          </small>
                          <p>Price: &#x20B9;{item.price}</p>
                          <p>Category: {item.category}</p>
                          <p>
                            <b>Description:</b> {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
          </Container>
        </div>
      </div>

    </>
  );
};

export default Seller;

// const [allRate, setAllRate] = useState([]);
// const aRate = await axios.get(
//   "https://fakestoreapi.com/products/"
// );
// setAllRate(aRate.data.rating);

// const rat = aRate.data;
// const newRat = rat.filter((p) => {
//   return (
//     p.rating == rate.data.rating
//   );
// });
// setAllRate(newRat);
