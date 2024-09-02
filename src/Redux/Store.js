import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";
import authReducer from "./Slices/AuthSlice";

const storeApp = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
export default storeApp;
