import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/ProductsSlice";
import authReducer from "./Slices/AuthSlice";
import cartReducer, { cartMiddleware } from "./Slices/CartSlice";
import favouriteReducer from "./Slices/FavouriteSlice";
import ordersReducer from "./Slices/OrdersSlice";
import adminOrdersReducer from "./Slices/adminOrdersSlice";

const storeApp = configureStore({
    reducer: {
        adminOrders: adminOrdersReducer,
        products: productsReducer,
        auth: authReducer,
        cart: cartReducer,
        favourites: favouriteReducer,
        orders: ordersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check to prevent non-serializable errors
        }).concat(cartMiddleware),
});
export default storeApp;
