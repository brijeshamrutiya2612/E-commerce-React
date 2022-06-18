import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import  prodReducer from "./ProductsSlice";

export const store = configureStore({
  reducer: {
    products: prodReducer,
    userlogin: loginReducer,
  },
});
