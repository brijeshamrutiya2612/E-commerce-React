import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/reducers/loginReducer";
import shop from "./login_bck.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { loginUser } = users;
  const [emails, setEmail] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(login());
  }, []);

  const home = useNavigate();
  const homeComponent = (e) => {
    e.preventDefault();

    const { email, password } = emails;
    if (email === "") {
      alert("Plz Enter Email");
    } else if (password === "") {
      alert("Plz Enter Password");
    }

    const payload = users.loginUser.find(
      (user) => user.email === emails.email && user.password === emails.password
      );

      if (payload) {
        home("/");
      } else {
        alert("Wrong credential !!");
      }
    setEmail("");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${shop})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "auto",
        height: "937px",
      }}
    >
      <div className="container pt-5 col-md-15 justify-content-center">
        <Container
          className="justify-content-center"
          style={{ overflow: "hidden" }}
        >
          <div className="my-4 pt-5 pl-5justify-content-center">
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
                className="container col-md-5 justify-content-center"
                style={{ fontSize: "50px", color: "#BE8550" }}
              >
                Mart
              </h2>
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
          </div>
        </Container>
        {/* {users.loginUser.map((item) => {
        return <p key={item.id}>{item.email}</p>;
      })} */}
      </div>
    </div>
  );
};

export default Login;
