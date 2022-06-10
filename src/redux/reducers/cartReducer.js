import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const baseURL = "https://fakestoreapi.com/products/";

const initialState = {
  cartItems: [],
  cartTotalQuntity: 0,
  cartTotalAmount: 0,
};
// export const addToCart = createAsyncThunk(
//   "productsCart/addToCart",
//   async (id) => {
//     try {
//       const response = await axios.get(baseURL + "/" + id);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    decreseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info(`Decreased ${action.payload.title} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );

        state.cartItems = nextCartItems;
        toast.error(`${action.payload.title}  removed from cart`, {
          position: "bottom-left",
        });
      }
    },
  },
});

export const { addToCart, decreseCart } = cartSlice.actions;

export default cartSlice.reducer;
