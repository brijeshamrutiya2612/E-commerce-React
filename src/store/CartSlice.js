import {
    createSlice,
    configureStore,
    createAsyncThunk,
    combineReducers,
  } from "@reduxjs/toolkit";
  import axios from "axios";
import { toast } from "react-toastify";
  

   const baseURL = "https://fakestoreapi.com/products";
//  const baseURL = "http://localhost:3333/user";

export const cartSlice = createSlice({
    name: "cart",
    initialState:{
      cartItems: [],
      cartTotalQuntity: 0,
      cartTotalAmount: 0,
    },
    reducers: {
      addToCart(state, action) {
        const itemIndex = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].cartQuantity += 1;
        } else {
          const tempProduct = { ...action.payload, cartQuantity: 1 };
          state.cartItems.push(tempProduct);
        }
      },
      removerFromCart(state, action) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItems = nextCartItems;
  
        // toast.error(`${action.payload.title}  removed from cart`, {
        //    position: "bottom-left",
        //  });
        },
      clearCart(state, action){
        state.cartItems = [];
        // toast.error(`Cart Clear`, {
        //    position: "bottom-left",
        //  });
        },
      decreseCart(state, action) {
        const itemIndex = state.cartItems.findIndex(
          (cartItem) => cartItem._id === action.payload._id
        );
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
  
          toast.info(`Decreased ${action.payload.title} cart quantity`, {
            position: "bottom-left",
          });
        } else if (state.cartItems[itemIndex].cartQuantity === 1) {
          const nextCartItems = state.cartItems.filter(
            (cartItem) => cartItem._id !== action.payload._id
          );
  
          state.cartItems = nextCartItems;
          // toast.error(`${action.payload.title}  removed from cart`, {
          //   position: "bottom-left",
          //});
        }
      },
      getTotals(state,action){
        let {total, quantity} = state.cartItems.reduce(
          (cartTotal, cartItem) => {
            const {itemPrice, cartQuantity} = cartItem;
            const itemTotal = itemPrice * cartQuantity;
  
            cartTotal.total += itemTotal
            cartTotal.quantity += cartQuantity
  
            return cartTotal;
          },
          {
            total: 0,
            quantity: 0,
          }
        );
        state.cartTotalQuntity = quantity;
        state.cartTotalAmount = total
      }
    },
  });

  export const { addToCart, decreseCart, removerFromCart, clearCart, getTotals } = cartSlice.actions;
  export default (cartSlice).reducer;