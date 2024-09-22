import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

// Initial state for the admin orders slice
const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

// Thunk to fetch all orders along with user and product details
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const ordersRef = collection(db, "orders");
      const usersRef = collection(db, "users");
      const productsRef = collection(db, "products");

      const ordersSnapshot = await getDocs(ordersRef);
      const usersSnapshot = await getDocs(usersRef);
      const productsSnapshot = await getDocs(productsRef);

      const users = usersSnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data();
        return acc;
      }, {});

      const products = productsSnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data();
        return acc;
      }, {});

      const orders = ordersSnapshot.docs.map((doc) => {
        const order = doc.data();
        return {
          id: doc.id,
          ...order,
          userName: users[order.userId]?.userName || "Unknown User",
          orderDetails: order.orderDetails.map((item) => ({
            ...item,
            imageUrl: products[item.productId]?.imageUrl || "",
            price: products[item.productId]?.price || 0,
            title: products[item.productId]?.title || `Product ${item.productId}`,
          })),
        };
      });

      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ orderId, newStatus }, { rejectWithValue }) => {
    try {
      const orderDoc = doc(db, "orders", orderId);
      await updateDoc(orderDoc, { orderStatusId: newStatus });

      return { orderId, newStatus };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the admin orders slice
const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, newStatus } = action.payload;
        const order = state.orders.find((order) => order.id === orderId);
        if (order) {
          order.orderStatusId = newStatus;
        }
      });
  },
});

export default adminOrdersSlice.reducer;
