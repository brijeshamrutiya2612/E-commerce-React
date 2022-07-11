import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Admin from "../Admin";

function AddProducts() {
  const nav = useNavigate();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [add, setAdd] = React.useState({
    itemCategory: "",
    itemName: "",
    itemPrice: "",
    quantity: "",
    rating: "",
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
      itemCategory: age,
      itemName: add.itemName,
      itemPrice: add.itemPrice,
      quantity: add.quantity,
      rating: add.rating,
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
      quantity: "",
      rating: "",
      itemUnit: "",
      itemDescription: "",
      image: "",
    })
  };
  
  return (
    <>
    <div className="col-lg-15">
      <Admin></Admin>
      </div>
    <div className="container">
      <Typography variant="h5" className="ml-3 my-4">
        Add Products
      </Typography>
      </div>
    <div className="container">
    <div className="container">
          <FormControl variant="standard" sx={{ minWidth: 520, maxWidth:500 }}>
          <InputLabel id="demo-simple-select-standard-label">
              Product's Category
            </InputLabel>
            <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="men's clothing">Men's Clothing</MenuItem>
          <MenuItem value="women's clothing">Women's Clothing</MenuItem>
          <MenuItem value="jewelery">Jewelery</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
        </Select>
          </FormControl>
          </div>
      <form onSubmit={handleSubmit}>
        <Box className="container">
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
              onChange={(e) => setAdd({ ...add, quantity: e.target.value })}
              name="quantity"
              className="container"
              id="outlined-read-only-input"
              label="Item Quantity"
            />
          </div>
          <div className="my-3">
            <TextField
              onChange={(e) => setAdd({ ...add, rating: e.target.value })}
              name="rating"
              className="container"
              id="outlined-read-only-input"
              label="Item Rating"
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
    </>
  );
}

export default AddProducts;
