import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Admin() {
  const nav = useNavigate();
  const [age, setAge] = React.useState("");
  const [list, setList] = React.useState([]);
  useEffect(() => {
    async function getAllStudent() {
      try {
        const listProduct = await axios.get(
          "https://fakestoreapi.com/products/categories",{
            withCredentials:false
          }
        );
        console.log(listProduct);
        setList(listProduct.data);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, []);
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
