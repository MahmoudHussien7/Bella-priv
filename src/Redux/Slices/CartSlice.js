import { createSlice } from "@reduxjs/toolkit";

// Function to save cart state to localStorage
const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

// Function to load the cart state from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : undefined;
  } catch (e) {
    console.warn("Failed to load cart from localStorage", e);
    return undefined;
  }
};

// Initial state loaded from localStorage or default state
const initialState = loadCartFromLocalStorage() || {
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

      // Check if an item with the same id AND title exists
      const existingItem = state.items.find(
        (item) => item.id === id && item.title === title
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
      } else {
        state.items.push({ id, title, imageUrl, price, quantity: 1 });
      }

      // Recalculate totals after adding item
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotalPrice(state.items);

      // Save updated state to localStorage
      saveCartToLocalStorage(state);
    },

    adjustQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;

        // Recalculate totals after adjusting quantity
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);

        // Save updated state to localStorage
        saveCartToLocalStorage(state);
      }
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);

        // Recalculate totals after removing item
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);

        // Save updated state to localStorage
        saveCartToLocalStorage(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      // Save updated state to localStorage
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, adjustQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
