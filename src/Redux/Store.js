import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";
import authReducer from "./Slices/AuthSlice";
import productsReducer from "./Slices/ProductSlice";

const storeApp = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
  },
});
export default storeApp;
