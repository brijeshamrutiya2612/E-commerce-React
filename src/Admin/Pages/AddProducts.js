import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const nav = useNavigate();
  const [add, setAdd] = React.useState({
    itemCategory: "",
    itemName: "",
    itemPrice: "",
    itemQty: "",
    itemUnit: "",
    itemDescription: "",
    image: "",
  });
  const [list, setList] = React.useState([]);
  useEffect(() => {
    async function getAllStudent() {
      try {
        const listProduct = await axios.get(
          "https://fakestoreapi.com/products/categories",
          {
            withCredentials: false,
          }
        );
        setList(listProduct.data);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, [list]);
  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/products/add", {
      itemCategory: add.itemCategory,
      itemName: add.itemName,
      itemPrice: add.itemPrice,
      itemQty: add.itemQty,
      itemUnit: add.itemUnit,
      itemDescription: add.itemDescription,
      image: add.image,
    }).catch((err)=> console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(add);
    sendRequest().then((data) => console.log(data));
    setAdd({
      itemCategory: "",
      itemName: "",
      itemPrice: "",
      itemQty: "",
      itemUnit: "",
      itemDescription: "",
      image: "",
    })
  };
  const bckDash = () => {
    nav("/admin");
  };
  return (
    <div className="container col-lg-5">
      <form onSubmit={handleSubmit}>
        <Box>
          <Button variant="outline-warning" className="btn" onClick={bckDash}>
            <strong>&#x2190; Back</strong>
          </Button>
          <FormControl className="my-3 container">
            <InputLabel id="demo-simple-select-label">
              Product's Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={list.item}
              label="Product's Category"
              onChange={(e) => setAdd({ ...add, itemCategory: e.target.value })}
            >
              {list.map((item, i) => {
                return <MenuItem value={item}>{item.toUpperCase()}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <div className="my-3">
            <TextField
              onChange={(e) => setAdd({ ...add, itemName: e.target.value })}
              label="Item Name"
              className="container"
              name="itemName"
              id="outlined-read-only-input"
            />
          </div>
          <div className="my-3">
            <TextField
              onChange={(e) => setAdd({ ...add, itemPrice: e.target.value })}
              name="itemPrice"
              className="container"
              id="outlined-read-only-input"
              label="Item Price"
            />
          </div>
          <div className="my-3">
            <TextField
              onChange={(e) => setAdd({ ...add, itemQty: e.target.value })}
              name="itemQty"
              className="container"
              id="outlined-read-only-input"
              label="Item Quantity"
            />
          </div>
          <div className="my-3">
            <TextField
              onChange={(e) => setAdd({ ...add, itemUnit: e.target.value })}
              name="itemUnit"
              className="container"
              id="outlined-read-only-input"
              label="Item Unit"
            />
          </div>
          <div className="my-3">
            <TextField
              onChange={(e) =>
                setAdd({ ...add, itemDescription: e.target.value })
              }
              name="itemDescription"
              className="container"
              id="outlined-read-only-input"
              label="Item Description"
            />
          </div>
          <Form.Control
            onChange={(e) => setAdd({ ...add, image: e.target.value })}
            name="image"
            className="my-3"
            type="text"
          />
          <Button type="submit" className="my-3" variant="success">
            Add Product
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default AddProducts;
