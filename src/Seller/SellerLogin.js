import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Store } from "../store/Context";
import { toast, ToastContainer } from "react-toastify";

const SellerLogin = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [emails, setEmail] = useState({
    email: "",
    password: "",
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { sellerInfo } = state;
  //  useEffect(()=>{
  //   if(sellerInfo){
  //     localStorage.removeItem("userInfo");
  //     localStorage.removeItem("shippingAddress");
  //     localStorage.removeItem("paymentMethod");
  //   }
  // },[sellerInfo])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/seller/login", {
        email: emails.email,
        password: emails.password,
      });
      const data = await res.data;
      ctxDispatch({ type: "SELLER_SIGNIN", payload: data });
      localStorage.setItem("sellerInfo", JSON.stringify(data));
      localStorage.removeItem("userInfo");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      nav("/SellerHome");
      return data;
    } catch (err) {
      toast.error("Invalid email or password");
    }
    //sendRequest().then((data)=>localStorage.setItem("userId", data._id)).then(()=>dispatch(loginActions.login())).then(()=>nav("/")).then(data=>console.log(data))
  };

  return (
    <div
      style={{
        background: "#D8E4E6",
        width: "auto",
        height: "auto",
      }}
    >
      <div className="container pt-5 col-md-15 justify-content-center">
        <Container
          className="justify-content-center"
          style={{ overflow: "hidden" }}
        >
          <div className="my-4 pt-5 pl-5 justify-content-center">
            <div
              className="container my-5 col-md-5 justify-content-center"
              style={{
                backgroundColor: "white",
                overflow: "hidden",
                boxShadow: "1px 1px 15px #343A40",
                borderRadius: "20px",
                height: "auto",
                opacity: 0.8,
              }}
            >
              <h2
                className="container text-center"
                variant="contained"
                style={{ lineHeight: "2em" }}
              >
                <ShoppingBag style={{ fontSize: "50px", color: "#14657C" }} />
              </h2>
              <h2 className="container mx-auto my-4 justify-content-center">
                Sign In
              </h2>

              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="col-md-11 my-3 justify-content-center"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  onChange={(e) =>
                    setEmail({ ...emails, email: e.target.value })
                  }
                />
              </div>
              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="container col-md-11 justify-content-center"
                  type="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  onChange={(e) =>
                    setEmail({ ...emails, password: e.target.value })
                  }
                />
                <div className="container my-5 justify-content-center">
                  <Button
                    className="container col-md-11 justify-content-center"
                    variant="contained"
                    style={{ backgroundColor: "#14657C" }}
                    onClick={handleSubmit}
                  >
                    LOGIN
                  </Button>
                </div>
                <p>
                  Not a member?{" "}
                  <Link to={`/NewSellerRegister?redirect=${redirect}`}>
                    Create Your Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
        {/* {users.loginUser.map((item) => {
        return <p key={item.id}>{item.email}</p>;
      })} */}
      </div>
    </div>
  );
};

export default SellerLogin;