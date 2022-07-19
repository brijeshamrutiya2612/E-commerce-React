import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../store/userSlice";

const NewSellerRegister = () => {
  const sign = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [registers, setRegister] = useState({
    firstname: "",
    lastname: "",
    mnfName: "",
    email: "",
    password: "",
    cPassword: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
    age: "",
    gstin: "",
    panno: "",
  });

  // console.log(registers);
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/seller/register", {
        firstname: registers.firstname,
        lastname: registers.lastname,
        mnfName: registers.mnfName,
        email: registers.email,
        password: registers.password,
        address1: registers.address1,
        address2: registers.address2,
        address3: registers.address3,
        Mobile: registers.phone,
        Age: registers.age,
        GSTIN: registers.gstin,
        PAN_NO: registers.panno,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  console.log(registers);
  const signIn = async (e) => {
    e.preventDefault();
    if (registers.password !== registers.cPassword) {
      toast.error("Password do not match");
      return;
    }
    // if (users.getUser.find(
    //     (user) =>
    //       user.email === registers.email
    //   )
    //   ) {
    //   toast.error("This " + `${registers.email}` + " is Already Register");
    //   }
    // if (users.getUser.find(
    //     (user) =>
    //       user.phone === registers.phone
    //   )
    //   ) {
    //   toast.error("This " + `${registers.phone}` + " is Already Register");
    //   }
    const {
      firstname,
      lastname,
      
      email,
      password,
      address1,
      address2,
      address3,
      phone,
      age,
    } = registers;

    if (firstname === "") {
      toast.error("First Name is Require");
    } else if (firstname.length < 3) {
      toast.error("First Name is Greter than 3 words");
    } else if (lastname === "") {
      toast.error("Last Name is Require");
    } else if (lastname.length < 3) {
      toast.error("Last Name is not valid");
    } else if (email === "") {
      toast.error("Email is Required");
    } else if (!email.includes("@")) {
      toast.error("Plz Enter Valid Email");
    } else if (password === "") {
      toast.error("Password is Required");
    } else if (password.length < 5) {
      toast.error("Password must be Enter in 6 to 10 Character");
    } else if (address1 === "") {
      toast.error("Address1 is Required");
    } else if (address2 === "") {
      toast.error("Address2 is Required");
    } else if (address3 === "") {
      toast.error("Address3 is Required");
    } else if (phone === "") {
      toast.error("Mobile No. is Required");
    } else if (phone.length < 5) {
      toast.error("Plz Enter Mobile No. Must be < 5");
    } else if (age === "") {
      toast.error("Age is Require");
    }
    sendRequest();
    localStorage.setItem("Seller", JSON.stringify(registers));
  };

  return (
    <>
      <div
        style={{
          background: "#D8E4E6",
          width: "auto",
          height: "auto",
        }}
      >
        <div className="container col-lg-4 pt-5 pb-3 justify-content-center">
          <form>
            <Container className="pt-1 justify-content-center">
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
                  <TextField
                    className="ml-4 col-md-11 my-3 justify-content-center"
                    label="Manufacturer Name:"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, mnfName: e.target.value })
                    }
                  />
                </div>
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
                    name="password"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, password: e.target.value })
                    }
                  />
                </div>
                <div className="container col-md-15 justify-content-center">
                  <TextField
                    className="ml-4 col-md-11 my-3 justify-content-center"
                    label="confirm Password"
                    type="password"
                    variant="outlined"
                    name="cPassword"
                    onChange={(e) =>
                      setRegister({ ...registers, cPassword: e.target.value })
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
                  <TextField
                    className="ml-4 col-md-11 my-3 justify-content-center"
                    label="GSTIN No.:"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, gstin: e.target.value })
                    }
                  />
                  <TextField
                    className="ml-4 col-md-11 my-3 justify-content-center"
                    label="PAN No.:"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, panno: e.target.value })
                    }
                  />
                  <div className="my-5 justify-content-center">
                    <Button
                      className="ml-4 col-md-11 justify-content-center"
                      variant="contained"
                      onClick={signIn}
                      style={{
                        backgroundColor: "#96B5BA",
                        border: "none",
                        borderRadius: "50px",
                      }}
                    >
                      Register
                    </Button>
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

export default NewSellerRegister;