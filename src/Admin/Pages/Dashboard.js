import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getData, getCategory } from "../../store/ProductsSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { getProd } = useSelector((state) => state.products);
  const [list, setList] = React.useState([]);
  useEffect(() => {
    dispatch(getData());
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
  }, []);
  const bckDash = () => {
    nav("/admin");
  };
  return (
    <div className="container col-lg-5 my-4">
      <Typography variant="h3" className="my-3">
        Dashboard
      </Typography>
      <Button variant="outline-warning" className="btn" onClick={bckDash}>
        <strong>&#x2190; Back</strong>
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Products
              </TableCell>
              <TableCell align="right">{getProd.length}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Category
              </TableCell>
              <TableCell align="right">{list.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Dashboard;
