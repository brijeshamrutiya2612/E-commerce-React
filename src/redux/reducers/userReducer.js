import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "./loginReducer";
import jwtDecode from "jwt-decode";

const initialState = {
  token:[], // localStorage.getItem("token"),
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
  age: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const userRegister = createAsyncThunk(
  "register/userRegister",
  async (registers, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3333/user", {
        firstname: registers.firstname,
        lastname: registers.lastname,
        email: registers.email,
        password: registers.password,
        phone: registers.phone,
        age: registers.age,
      });
      localStorage.setTime("token", response);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state, action) => {
      return {
        ...state,
        addTodoStatus: "pending",
        addTodoError: "",
      };
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);

        return {
          ...state,
          token: action.payload,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          phone: user.phone,
          age: user.age,
          registerStatus: "success",

          // register: [action.payload, ...state.token],
          // addTodoStatus: "success",
          // addTodoError: "",
        };
      } else return state;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      return {
        ...state,
        addTodoStatus: "rejected",
        addTodoError: action.payload,
      };
    });
  },
});



export default registerSlice.reducer;
