import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../redux/reducers/userReducer";

const Register = () => {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);

  console.log(register);
  const sign = useNavigate();
  const [registers, setRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    age: "",
  });
  const signIn = (e) => {
    e.preventDefault();
    dispatch(userRegister(registers));
   // sign("/Login");
  };

  return (
    <>
      <div className="container col-lg-5 col-md-15 mt-5 justify-content-center">
        <form>
          <Container className="mt-5 justify-content-center">
            <div
              className="container my-15 justify-content-center"
              style={{
                overflow: "hidden",
                boxShadow: "1px 1px 15px #343A40",
                borderRadius: "20px",
              }}
            >
              <h2 className="container ml-4 col-md-11 my-3">Sign Up</h2>
              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="ml-4 col-md-11 my-3 justify-content-center"
                  label="Firstname"
                  variant="outlined"
                  type="text"
                  name="name.firstname"
                  onChange={(e) =>
                    setRegister({ ...registers, firstname: e.target.value })
                  }
                />
              </div>
              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="ml-4 col-md-11 my-3 justify-content-center"
                  label="Lastname"
                  variant="outlined"
                  name="name.lastname"
                  onChange={(e) =>
                    setRegister({ ...registers, lastname: e.target.value })
                  }
                />
              </div>
              {/* <div className="container col-md-15 justify-content-center">
            <TextField
              className="ml-4 col-md-11 my-3 justify-content-center"
              label="Username"
              variant="outlined"
              onChange={(e) =>
                setRegister({ ...registers, username: e.target.value })
              }
            />
          </div> */}
              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="ml-4 col-md-11 my-3 justify-content-center"
                  type="email"
                  label="Email"
                  variant="outlined"
                  onChange={(e) =>
                    setRegister({ ...registers, email: e.target.value })
                  }
                />
              </div>
              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="ml-4 col-md-11 my-3 justify-content-center"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={(e) =>
                    setRegister({ ...registers, password: e.target.value })
                  }
                />
              </div>
              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="ml-4 col-md-11 my-3 justify-content-center"
                  label="Mobile:"
                  variant="outlined"
                  onChange={(e) =>
                    setRegister({ ...registers, phone: e.target.value })
                  }
                />
                <TextField
                  className="ml-4 col-md-11 my-3 justify-content-center"
                  label="Age:"
                  variant="outlined"
                  onChange={(e) =>
                    setRegister({ ...registers, age: e.target.value })
                  }
                />
                <div className="my-5 justify-content-center">
                  <Button
                    className="ml-4 col-md-11 justify-content-center"
                    variant="contained"
                    onClick={signIn}
                  >
                  {register.registerStatus === "pending" ? "Submitting"
                    
                   : "Register"}
                  </Button>
                  {register.registerStatus === "rejected" ? (
                    <p>{register.registerError}</p>
                  ) : null}
                </div>
                <p>
                  Have an account? <Link to="/Login">Log in</Link>
                </p>
              </div>
            </div>
          </Container>
        </form>
        {/* {register.map((item, i)=>{
      return(
        <p key={i}>{item.firstname}</p>
      )
    })} */}
      </div>
    </>
  );
};

export default Register;
