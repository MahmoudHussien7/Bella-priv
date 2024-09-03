import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebaseconfig";
import { getAuth } from "firebase/auth";

// Async action to fetch products from Firestore
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  }
);

// Async action to add a product to Firestore and Redux store
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ newProduct, uid }) => {
    // Add product to Firestore with auto-generated ID and include uid
    const docRef = await addDoc(collection(db, "products"), {
      ...newProduct,
      price: parseFloat(newProduct.price), // Ensure price is a number
      quantity: parseInt(newProduct.quantity), // Ensure quantity is a number
      uid, // Include uid in the product data
    });

    // Return product with Firestore-generated unique ID
    return { id: docRef.id, ...newProduct, uid };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Handle addProduct
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new product to the list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
