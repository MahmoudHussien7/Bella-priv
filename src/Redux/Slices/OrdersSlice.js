import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

// Initial state for the orders slice
const initialState = {
  orders: [], // Array to hold the user's orders
  selectedOrder: null, // The currently selected order for viewing details
  status: "idle", // Status of the orders fetching process (idle, loading, succeeded, failed)
  error: null, // Error message, if any, during the orders fetching or placing process
};

// Async thunk for placing an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ cart, userId, paymentMethod }, { rejectWithValue }) => {
    try {
      // Reference to the orders collection in Firestore
      const orderRef = collection(db, "orders");

      // Get the current timestamp for the order date
      const orderDate = Timestamp.now();

      // Static orderStatusId (this could be dynamic based on your order status logic)
      const orderStatusId = "TUgeq6U27JsTojE1XukC";

      let orderDetails = [];
      let totalAmount = 0;

      // NEW FUNCTIONALITY: Process each item in the cart
      for (const item of cart) {
        // Get the current product data from Firestore
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          const currentQuantity = productData.quantity;

          // Check if there's enough quantity available
          if (currentQuantity >= item.quantity) {
            // Calculate the new quantity after deducting the ordered amount
            const newQuantity = currentQuantity - item.quantity;

            // Update the product quantity in Firestore
            await updateDoc(productRef, { quantity: newQuantity });

            // Add the item to order details
            orderDetails.push({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            });

            // Update the total amount of the order
            totalAmount += item.quantity * item.price;
          } else {
            // If there's not enough quantity, throw an error
            throw new Error(`Insufficient quantity for product ${item.id}`);
          }
        } else {
          // If the product doesn't exist, throw an error
          throw new Error(`Product ${item.id} not found`);
        }
      }

      // Create a new order document in Firestore
      const docRef = await addDoc(orderRef, {
        userId,
        orderDate,
        orderDetails,
        paymentMethod,
        orderStatusId,
        totalAmount,
      });

      // Get the generated orderId (document ID)
      const orderId = docRef.id;

      // Update the newly created order document with the orderId
      await updateDoc(docRef, {
        orderId,
      });

      // Return the complete order data
      return {
        orderId,
        userId,
        orderDate,
        orderDetails,
        paymentMethod,
        orderStatusId,
        totalAmount,
      };
    } catch (error) {
      // If any error occurs during the process, return it as a rejected value
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching orders for the current user
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      // Get the current user's ID
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Reference to the orders collection in Firestore
      const ordersRef = collection(db, "orders");

      // Query to get only the orders of the current user
      const q = query(ordersRef, where("userId", "==", userId));

      // Get the snapshot of the orders collection
      const querySnapshot = await getDocs(q);

      // Map the documents to an array of order objects
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Return the fetched orders
      return orders;
    } catch (error) {
      // Return the error message if the operation fails
      return rejectWithValue(error.message);
    }
  }
);

// Create the orders slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Reducer to handle order selection
    selectOrder: (state, action) => {
      state.selectedOrder = state.orders.find(
        (order) => order.orderId === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle state changes for placeOrder thunk
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle state changes for fetchOrders thunk
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the actions to use in components
export const { selectOrder } = ordersSlice.actions;

// Export the reducer to include in the store
export default ordersSlice.reducer;
