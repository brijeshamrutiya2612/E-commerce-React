import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { userRegister } from "../redux/reducers/userReducer";
// import shop from "./login_bck.jpg";
import axios from 'axios';
import Header from "./Header";

const Register = () => {
  // const dispatch = useDispatch();
  // const users = useSelector((state) => state.users);
  // const register = useSelector((state) => state.register);

  const sign = useNavigate();
  
  const [registers, setRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
    age: "",
  });
  // console.log(registers);
  const sendRequest = async () =>{
    const res = await axios.post("http://localhost:5000/api/signup",{
    firstname: registers.firstname,
    lastname: registers.lastname,
    email: registers.email,
    password: registers.password,
    address1: registers.address1,
    address2: registers.address2,
    address3: registers.address3,
    phone: registers.phone,
    age: registers.age,
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  const signIn = async (e) => {
    e.preventDefault();
    sendRequest().then(()=>sign("/login"));
    


    // if (
    //   users.loginUser.find(
    //     (user) =>
    //       user.email === registers.email && user.phone === registers.phone
    //   )
    // ) {
    //   alert("This <b>" + `${registers.email}` + "</b> is Already Register");
    // }

    // const {
    //   firstname,
    //   lastname,
    //   email,
    //   password,
    //   address1,
    //   address2,
    //   address3,
    //   phone,
    //   age,
    // } = registers;

    // if (firstname === "") {
    //   alert("First Name is Require");
    // } else if (firstname.length < 3) {
    //   alert("First Name is Greter than 3 words");
    // } else if (lastname === "") {
    //   alert("Last Name is Require");
    // } else if (lastname.length < 3) {
    //   alert("Last Name is not valid");
    // } else if (email === "") {
    //   alert("Email is Required");
    // } else if (!email.includes("@")) {
    //   alert("Plz Enter Valid Email");
    // } else if (password === "") {
    //   alert("Password is Required");
    // } else if (password.length < 5) {
    //   alert("Password must be Enter in 6 to 10 Character");
    // } else if (address1 === "") {
    //   alert("Address1 is Required");
    // } else if (address2 === "") {
    //   alert("Address2 is Required");
    // } else if (address3 === "") {
    //   alert("Address3 is Required");
    // } else if (phone === "") {
    //   alert("Mobile No. is Required");
    // } else if (phone.length < 5) {
    //   alert("Plz Enter Valid Mobile No.");
    // } else if (age === "") {
    //   alert("Age is Require");
    // }

    // localStorage.setItem("user", JSON.stringify(registers));
    // dispatch(userRegister(registers));
  };

  return (
    <>
      <div
        style={{
          // backgroundImage: `url(${shop}`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "auto",
          height: "auto",
        }}
      >
        <div className="container col-lg-5 col-md-15 justify-content-center">
          <form>
            <Container className="pt-5 justify-content-center">
              <div
                className="container justify-content-center"
                style={{
                  backgroundColor: "white",
                  overflow: "hidden",
                  boxShadow: "1px 1px 15px #343A40",
                  borderRadius: "20px",
                  opacity: 0.8,
                }}
              >
                <h2 className="container pt-4 ml-4 col-md-11">Sign Up</h2>
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
                    name="email"
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
                    label="Address1"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, address1: e.target.value })
                    }
                  />
                </div>
                <div className="container col-md-15 justify-content-center">
                  <TextField
                    className="ml-4 col-md-11 my-3 justify-content-center"
                    label="Address2"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, address2: e.target.value })
                    }
                  />
                </div>
                <div className="container col-md-15 justify-content-center">
                  <TextField
                    className="ml-4 col-md-11 my-3 justify-content-center"
                    label="Address3"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, address3: e.target.value })
                    }
                  />
                </div>
                <div className="container col-md-15 justify-content-center">
                  <TextField
                    className="ml-4 col-md-11 my-3 justify-content-center"
                    label="Mobile:"
                    type="number"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, phone: e.target.value })
                    }
                  />
                  <TextField
                    className="ml-4 col-md-11 my-3 justify-content-center"
                    label="Age:"
                    type="number"
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
                      Sign Up
                      {/* {register.registerStatus === "pending"
                        ? "Submitting"
                        : "Register"} */}
                    </Button>
                    {/* {register.registerStatus === "rejected" ? (
                      <p>{register.registerError}</p>
                    ) : null} */}
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
      </div>
    </>
  );
};

export default Register;