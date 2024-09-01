// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Helper functions to calculate total quantity and price
const calculateTotalQuantity = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0);
const calculateTotalPrice = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, imageUrl, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, increment the quantity
        existingItem.quantity += 1;
      } else {
        // Add new item to cart with quantity of 1
        state.items.push({ id, title, imageUrl, price, quantity: 1 });
      }

      // Recalculate totalQuantity and totalPrice after adding item
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotalPrice(state.items);
    },

    adjustQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;

        // Recalculate totalQuantity and totalPrice after adjusting quantity
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);

        // Recalculate totalQuantity and totalPrice after removing item
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);
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
