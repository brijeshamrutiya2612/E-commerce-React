import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/reducers/loginReducer";

const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { loginUser } = users;
  const [email, setEmail] = useState({
    email:"",
    pwd:""
  });
  console.log(email.email,email.pwd)
  useEffect(() => {
    dispatch(login());
  }, []);

  const home = useNavigate();
  const homeComponent = (e) => {
    e.preventDefault()
    if(email.email && email.pwd){
      console.log(email)
    }
    else{
      console.log("All Fields are Required");
    }
    const payload = users.loginUser.find(
      (user) => user.email === email.email && user.password === email.pwd
    );

    if (payload) {
      home("/");
    } else {
      alert("Wrong credential !!");
    }
   setEmail('')
  };

  return (
    <div className="container col-lg-5 col-md-5 justify-content-center">
      <h2 className="container my-5 col-lg-6 col-md-15 justify-content-center">
        Welcome to Our Mart
      </h2>
      <Container className="col-md-15 justify-content-center">
        <div
          className="container my-15 justify-content-center"
          style={{
            overflow: "hidden",
            boxShadow: "1px 1px 15px #343A40",
            borderRadius: "20px",
            height: "auto",
          }}
        >
          <h2 className="container mx-auto my-4 justify-content-center">
            Sign In
          </h2>
          <form>
            <div className="container col-md-15 justify-content-center">
              <TextField
                className="col-md-11 my-3 justify-content-center"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail({...email, email:e.target.value})}
              />
            </div>
            <div className="container col-md-15 justify-content-center">
              <TextField
                className="col-md-11 justify-content-center"
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => setEmail({...email, pwd:e.target.value})}
              />
              <div className="my-5 justify-content-center">
                <Button
                  className="col-md-11 justify-content-center"
                  variant="contained"
                  onClick={homeComponent}
                >
                  LOGIN
                </Button>
              </div>
              <p>
                Not a member? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </Container>
      {users.loginUser.map((item) => {
        return <p key={item.id}>{item.email}</p>;
      })}
    </div>
  );
};

export default Login;
