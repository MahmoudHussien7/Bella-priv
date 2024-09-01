import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";

const storeApp = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export default storeApp;
