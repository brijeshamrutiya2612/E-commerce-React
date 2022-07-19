import { Avatar, IconButton, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Store } from "../store/Context";
import SellerSideBar from "./SellerSideBar";

const SellerHome = () => {
  const { state } = useContext(Store);
  const { sellerInfo } = state;

  return (
    <div className="my-5">
      <Row>
        <Col md={2}>
          <div className="p-3">
            <div
              style={{
                border: "none",
                background: "#D8E4E6",
                boxShadow: "5px 5px 15px #888888",
                borderRadius: "20px",
                height: "100%",
              }}
              className="p-4"
            >
              <Avatar
                className="mr-2"
                sx={{ background: "black", float: "left" }}
                alt={sellerInfo.firstname}
                src="/static/images/avatar/2.jpg"
              />
              <Typography className="p-1" variant="h6">
                {sellerInfo.firstname}
              </Typography>

              <div>
                <SellerSideBar></SellerSideBar>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={8}>
          <div
            style={{
              border: "none",
              background: "#D8E4E6",
              boxShadow: "5px 5px 15px #888888",
              borderRadius: "20px",
              width: "100%",
              height: "100%",
            }}
            className="p-4"
          ></div>
        </Col>
      </Row>
    </div>
  );
};

export default SellerHome;
