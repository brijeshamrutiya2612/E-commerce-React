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
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { getProd } = useSelector((state) => state.products);
  // console.log(getProd[0].itemCategory.length)
  const [list, setList] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const [count, setCount] = React.useState([]);
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
  useEffect(() => {
    const getUnique = (arr, index) => {
      const unique = getProd
        .map((e) => e[index])
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter((e) => arr[e])
        .map((e) => arr[e]);
      return unique;
    };
    setFilter(getUnique(getProd, "itemCategory"));
  }, [getProd]);
  const mediaTypes = getProd
    .map((dataItem) => dataItem.itemCategory) // get all media types
    .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates

  const counts = mediaTypes.map((mediaType) => ({
    type: mediaType,
    count: getProd.filter((item) => item.itemCategory === mediaType).length,
  }));
  const bckDash = () => {
    nav("/admin");
  };
  return (
    <div className="col-lg-15">
      <Typography variant="h3" className="ml-3 my-4">
        Dashboard
      </Typography>
      <Button variant="outline-warning" className="ml-4 btn" onClick={bckDash}>
        <strong>&#x2190; Back</strong>
      </Button>
      <TableContainer component={Paper} className="container">
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
      <Typography variant="h4" className="ml-3 my-3 mt-5">Products & Category</Typography>
      <TableContainer component={Paper} className="mt-3 container my-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow
              style={{
                borderRight: "none",
              }}
            >
              <TableCell>Category</TableCell>
            {counts.map((item, i) => {
              return (
                <>
                    <TableCell style={{ borderRight: "0px" }} align="center">
                      {item.type.toUpperCase()}
                    </TableCell>
                </>
              );
            })}
            </TableRow>
            <TableRow
                    style={{
                      borderRight: "none",
                    }}
                  >
                    <TableCell>Products</TableCell>
                    {counts.map((item, i) => {
              return (
                <>
                    <TableCell align="center"><Link to={`${getProd._id}`}>{item.count}</Link></TableCell>
                  </>
              )})}
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Dashboard;
