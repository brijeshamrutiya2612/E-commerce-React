import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createContext, useReducer } from "react";
import { toast } from "react-toastify";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast.error(`${action.payload.itemName}  removed from cart`, {
        position: "bottom-left",
      });
      return {
        ...state, 
        cart: {
          ...state.cart,
          cartItems,
          
        },
      };
    }
    case "CART_CLEAR":{
      const cartItems = state.cart.cartItems.filter(
        (item) => item !== action.payload
      );
      localStorage.removeItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: {cartItems:[]}, };
      }
    case "USER_SIGNIN": {
      return { ...state, userInfo: action.payload };
    }
    case "USER_SIGNOUT": {
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
      };
    }
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case "SAVE_PAYMENT_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
      
    default:
      return state;
  }
}
const cartSlice = createSlice({
  name: "cart",
  initialState:{
    carty: [],
    cartTotalQuntity: 0,
    cartTotalAmount: 0,
  },
  reducers:{
    removerFromCart(state, action) {
      const nextCartItems = state.carty.filter(
        (carty) => carty._id !== action.payload._id
        );
        state.cartItems = nextCartItems;
        localStorage.removeItem("cartItems",state.cartItems);
      toast.error(`${action.payload.title}  removed from cart`, {
         position: "bottom-left",
       });
      },
}
})
export const {removerFromCart} = cartSlice.actions;
export default cartSlice.reducer;
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
