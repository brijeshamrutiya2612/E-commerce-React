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

function AddProducts() {
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
  const handleChange = () => {
    setAge();
  };

  return (
    <div className="container col-lg-5">
      <Box>
        <FormControl fullWidth className="my-3">
          <InputLabel id="demo-simple-select-label">
            Product's Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={list.item}
            label="Product's Category"
            onChange={handleChange}
          >
            {list.map((item, i) => {
                return(
                    <MenuItem value={item}>{item.toUpperCase()}</MenuItem>
                )
            })}
          </Select>
        </FormControl>
        <div className="my-3">
          <TextField id="outlined-read-only-input" label="Item Name" />
        </div>
        <div className="my-3">
          <TextField id="outlined-read-only-input" label="Item Price" />
        </div>
        <div className="my-3">
          <TextField id="outlined-read-only-input" label="Item Description" />
        </div>
        <Button variant="success">Add Product</Button>
      </Box>
    </div>
  );
}

export default AddProducts;
