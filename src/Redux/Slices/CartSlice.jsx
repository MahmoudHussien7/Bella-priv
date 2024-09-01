// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  subtotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, image, price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Update quantity if item already exists in cart
        existingItem.quantity += quantity;
      } else {
        // Add new item to cart
        state.items.push({ id, name, image, price, quantity });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },

    adjustQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        const quantityDifference = quantity - item.quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += item.price * quantityDifference;
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.totalPrice -=
          state.items[itemIndex].quantity * state.items[itemIndex].price;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, adjustQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
