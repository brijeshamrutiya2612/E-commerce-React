import * as React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Admin() {
  const nav = useNavigate();
  const goDashboard = () =>{
    nav("/dashboard");
  }
  const goAddproducts = () =>{
    nav("/addproducts");
  }
  const goUsers = () =>{
    nav("/User");
  }

  return (
    <div className="container col-lg-6 my-4 justify-content-center">
      <Button className="col-lg-3 mr-3 my-2" variant="success" onClick={goDashboard}>Dashboard</Button>
      <Button className="col-lg-4 mr-3 my-2" variant="success" onClick={goAddproducts}>Add Products</Button>
      <Button className="col-lg-3 mr-3 my-2" variant="success" onClick={goUsers}>Users</Button>
    </div>
  );
}

export default Admin;
