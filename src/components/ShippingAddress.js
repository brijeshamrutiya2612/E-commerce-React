import React, { useContext, useEffect, useState } from "react";
import Helmet from "helmet";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import { Store } from "../store/Context";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";
import { HelmetProvider } from "react-helmet-async";

const ShippingAddress = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [registers, setRegister] = useState({
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
  });
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const submitHandler = () => {
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        registers,
      },
    });
    localStorage.setItem("shippingAddress", JSON.stringify({ registers }));
    navigate("/Payment");
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Shipping Address</title>
        </Helmet>

        <CheckOutSteps step1 step2></CheckOutSteps>
        <div
        className="container mb-5"
        style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "auto",
            height: "auto",
          }}
        >
        <h1 className="my-3">Shipping Address</h1>
          <div className="my-2">
            <form>
              <div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    label="Firstname"
                    variant="outlined"
                    type="text"
                    name="//name.firstname"
                    //value={userInfo.firstname}
                    onChange={(e) =>
                      setRegister({ ...registers, firstname: e.target.value })
                    }
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    label="Lastname"
                    variant="outlined"
                    name="name.lastname"
                    //value={userInfo.lastname}
                    onChange={(e) =>
                      setRegister({ ...registers, lastname: e.target.value })
                    }
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    label="Address1"
                    type="text"
                    variant="outlined"
                    //value={userInfo.address1}
                    onChange={(e) =>
                      setRegister({ ...registers, address1: e.target.value })
                    }
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    label="Address2"
                    type="text"
                    variant="outlined"
                    //value={userInfo.address2}
                    onChange={(e) =>
                      setRegister({ ...registers, address2: e.target.value })
                    }
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    label="Address3"
                    type="text"
                    variant="outlined"
                    //value={userInfo.address3}
                    onChange={(e) =>
                      setRegister({ ...registers, address3: e.target.value })
                    }
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    label="Mobile:"
                    type="number"
                    variant="outlined"
                    //value={userInfo.phone}
                    onChange={(e) =>
                      setRegister({ ...registers, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        <div className="text-left my-1">
          <Button variant="warning" size="sm" onClick={submitHandler}>
            Continue
          </Button>
        </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;

/* <Box
  className="mt-5"
  style={{
    backgroundColor: "ButtonFace",
    borderRadius: "20px",
    width: "auto",
    minWidth: "100px",
  }}
>
  <div className="p-3">
    <h4 className="my-1">Shipping Address</h4>
    <p>
      {userInfo.address1}
      <br />
      {userInfo && userInfo.address2}
      <br />
      {userInfo && userInfo.address3}
    </p>
  </div>
</Box>
<p
  className="text-left my-1"
  style={{
    float: "left",
    fontSize: "13px",
    marginLeft: "5px",
    marginRight: "5px",
  }}
>
  You Can Change Your Shipping Address
</p>
<div className="text-left my-1">
  <Button variant="success" size="sm" onClick={chngAdrs}>
    Change Address
  </Button>
</div>
{change ? (
  <>
    <h1>
      Hello
      <Button variant="success" size="sm" onClick={chngAdrs}>
        Change Address
      </Button>
    </h1>
  </>
) : null} */
