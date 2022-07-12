import React, { useContext, useReducer, useState } from "react";
import { Button, Col, Container, Row,  } from "react-bootstrap";
import axios from "axios";
import { Input } from "@mui/material";
import { Store } from "../../store/Context";
import SideBar from "./SideBar";
import {toast,ToastContainer} from 'react-toastify'
import { getError } from "../../utils";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, error: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false};
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false};

      default:
        return state;
  }
}

const Userprofile = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  
    const [firstname, setFirstname] = useState(userInfo.firstname);
    const [lastname, setLastname] = useState(userInfo.lastname);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
  
  const sendUpdateRequest = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios
        .put("http://localhost:5000/api/profile", {
          firstname,
          lastname,
          email,
          password,
        },
        {
          headers: {Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({
          type: 'UPDATE_SUCCESS'
        })  
        ctxDispatch({type: 'USER_SIGNIN', payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('User updated successfully');
    }catch(err){
      dispatch({type:'UPDATE_FAIL'})
      toast.error(getError(err))
    }
  };

  return (
    <>
      {/* {loading ? (
        <>
          <div className="container pt-5">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        </>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <> */}
          <div>
          <Row>
              <Col md={3} style={{height:"auto",minHeight:"680px",maxHeight:"500px"}}>
              <SideBar></SideBar>
              </Col>
              <Col lg={8} style={{width:"auto"}}>
            <ToastContainer position="top-center" limit={1}/>
            <div>
              <div>
                <div>
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
                        <h2 className="container pt-4 ml-4 col-md-11">
                          Profile
                        </h2>
                        <div className="container col-md-15 justify-content-center">
                          <Input
                            className="ml-4 col-md-11 my-3 justify-content-center"
                            label="Firstname"
                            type="text"
                            variant="standard"
                            value={firstname}
                            onChange={(e) =>
                              setFirstname(e.target.value)
                            }
                          />
                        </div>
                        <div className="container col-md-15 justify-content-center">
                          <Input
                            className="ml-4 col-md-11 my-3 justify-content-center"
                            label="Lastname"
                            variant="standard"
                            value={lastname}
                            onChange={(e) =>
                              setLastname(e.target.value)
                            }
                          />
                        </div>

                        <div className="container col-md-15 justify-content-center">
                          <Input
                            className="ml-4 col-md-11 my-3 justify-content-center"
                            type="email"
                            label="Email"
                            value={email}
                            variant="standard"
                            onChange={(e) =>
                              setEmail(e.target.value)
                            }
                          />
                        </div>
                        <div className="container col-md-15 justify-content-center">
                          <Input
                            className="ml-4 col-md-11 my-3 justify-content-center"
                            label="Password"
                            type="password"
                            variant="standard"
                            onChange={(e) =>
                              setPassword(e.target.value)
                            }
                          />
                        </div>
                        <div className="container col-md-15 justify-content-center">
                          <div className="my-5 justify-content-center">
                            <Button
                              className="ml-4 col-md-11 justify-content-center"
                              variant="warning"
                              onClick={sendUpdateRequest}
                            >
                              Update Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Container>
                  </form>
                </div>
              </div>
            </div>
            </Col>
            </Row>
          </div>
        {/* </>
      )} */}
    </>
  );
};

export default Userprofile;
