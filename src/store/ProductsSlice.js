import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";


const baseURL = "https://fakestoreapi.com/products/";
const initialState = {
  getProd: [],
  addTodoStatus: "",
  addTodoError: "",
  getTodosStatus: "",
  getTodosError: "",
  updateTodoStatus: "",
  updateTodoError: "",
  deleteTodoStatus: "",
  deleteTodoError: "",
  searchTodoStatus: "",
  searchTodoError: "",
}
export const getData = createAsyncThunk(
  "getProd/getData",
  async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/",{
        withCredentials:false
      });
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const getCategory = createAsyncThunk(
  "getProd/getCategory",
  async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories",{
        withCredentials:false
      });
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const prodSlice = createSlice({
  name: "getProd",
  initialState,
  reducers: {},
  extraReducers: {
    [getData.pending]: (state, action) => {
      return {
        ...state,
        getTodosStatus: "pending",
        getTodosError: "",
      };
    },
    [getData.fulfilled]: (state, action) => {
      return {
        ...state,
        getProd: action.payload,
        getTodosStatus: "success",
        getTodosError: "",
      };
    },
    [getData.rejected]: (state, action) => {
      return {
        ...state,
        getTodosStatus: "rejected",
        getTodosError: action.payload,
      };
    },
  }
});

// export const prodActions = prodSlice.actions;
export default prodSlice.reducer