import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const baseURL = "https://jsonplaceholder.typicode.com/";
const baseURL = "https://fakestoreapi.com/products/";

const initialState = {
  products: [],
  productsCart: 0,
  addStatus: "",
  addError: "",
  getTodosStatus: "",
  getTodosError: "",
  updateTodoStatus: "",
  updateTodoError: "",
  deleteTodoStatus: "",
  deleteTodoError: "",
  searchTodoStatus: "",
  searchTodoError: "",
};

export const getAdds = createAsyncThunk(
  "products/getAdds",
  async (_id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const homeSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    // [addToCart.pending]: (state, action) => {
    //   return {
    //     ...state,
    //     addStatus: "pending",
    //     addError: "",
    //   };
    // },
    // [addToCart.fulfilled]: (state, action) => {
    //   return {
    //     ...state,
    //     productsCart: [action.payload, ...state.productsCart],
    //     addStatus: "success",
    //     addError: "",
    //   };
    // },
    // [addToCart.rejected]: (state, action) => {
    //   return {
    //     ...state,
    //     addStatus: "rejected",
    //     addError: action.payload,
    //   };
    // },
    [getAdds.pending]: (state, action) => {
      return {
        ...state,
        getTodosStatus: "pending",
        getTodosError: "",
      };
    },
    [getAdds.fulfilled]: (state, action) => {
      return {
        ...state,
        products: action.payload,
        getTodosStatus: "success",
        getTodosError: "",
      };
    },
    [getAdds.rejected]: (state, action) => {
      return {
        ...state,
        getTodosStatus: "rejected",
        getTodosError: action.payload,
      };
    },
},
});

export default (homeSlice).reducer