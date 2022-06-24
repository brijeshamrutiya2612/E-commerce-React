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
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../store/userSlice";

function User() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {user} = useSelector((state)=>state.user)
  console.log(user)
  useEffect(() => {
    dispatch(getUserData())

  }, []);
  const bckDash = () => {
    nav("/admin");
  };
  return (
    <div className="container col-lg-5 my-4">
      <Typography variant="h3" className="my-3">
        User's Detail
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
                user
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Category
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default User;
