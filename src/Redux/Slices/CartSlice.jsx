// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [], // Array of cart items
//   totalQuantity: 0,
//   totalPrice: 0,
// };

// // Helper functions to calculate total quantity and price
// const calculateTotalQuantity = (items) =>
//   items.reduce((sum, item) => sum + item.quantity, 0);
// const calculateTotalPrice = (items) =>
//   items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { id, title, imageUrl, price, uid } = action.payload;
//       // Find existing item for the current user
//       const existingItem = state.items.find((item) => {
//         item.id === id || item.uid === uid,
//           console.log("====================================");
//         console.log(item);
//         console.log("====================================");
//       });

//       if (existingItem) {
//         existingItem.quantity += 1; // Increment quantity if the same product exists
//       } else {
//         state.items.push({ id, title, imageUrl, price, quantity: 1, uid });
//       }

//       // Recalculate totals after adding item
//       state.totalQuantity = calculateTotalQuantity(state.items);
//       state.totalPrice = calculateTotalPrice(state.items);
//     },

//     adjustQuantity: (state, action) => {
//       const { id, quantity, uid } = action.payload;
//       const item = state.items.find(
//         (item) => item.id === id || item.uid === uid
//       );

//       if (item && quantity > 0) {
//         item.quantity = quantity;

//         // Recalculate totals after adjusting quantity
//         state.totalQuantity = calculateTotalQuantity(state.items);
//         state.totalPrice = calculateTotalPrice(state.items);
//       }
//     },

//     removeFromCart: (state, action) => {
//       const { id, uid } = action.payload;
//       const itemIndex = state.items.findIndex(
//         (item) => item.id === id && item.uid === uid
//       );

//       if (itemIndex !== -1) {
//         state.items.splice(itemIndex, 1);

//         // Recalculate totals after removing item
//         state.totalQuantity = calculateTotalQuantity(state.items);
//         state.totalPrice = calculateTotalPrice(state.items);
//       }
//     },

//     clearCart: (state) => {
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0;
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart, adjustQuantity } =
//   cartSlice.actions;
// export default cartSlice.reducer;
