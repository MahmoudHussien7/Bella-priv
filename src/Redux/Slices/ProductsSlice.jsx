import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

// Fetch products
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

// Add a product
export const addProducts = createAsyncThunk(
    "products/addProducts",
    async ({ title, price, imageUrl, category, description, quantity }) => {
        try {
            const newProduct = await addDoc(collection(db, "products"), {
                title,
                category,
                description,
                imageUrl,
                price,
                quantity,
                createdAt: new Date(),
            });
            return {
                id: newProduct.id,
                title,
                price,
                imageUrl,
                category,
                description,
                quantity,
            };
        } catch (error) {
            throw new Error("Failed to add product: " + error.message);
        }
    }
);

// Update a product
export const updateProducts = createAsyncThunk(
    "products/updateProducts",
    async ({ productId, updatedData }) => {
        const productDoc = doc(db, "products", productId);
        try {
            await updateDoc(productDoc, updatedData);
            return { id: productId, ...updatedData };
        } catch (error) {
            throw new Error("Failed to update product: " + error.message);
        }
    }
);

// Delete a product
export const deleteProducts = createAsyncThunk(
    "products/deleteProducts",
    async (productId) => {
        const productDoc = doc(db, "products", productId);
        try {
            await deleteDoc(productDoc);
            return productId; // Return the ID of the deleted product
        } catch (error) {
            throw new Error("Failed to delete product: " + error.message);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
        filteredItems: [], // Add filtered items
        selectedCategories: [], // Add category filters
    },
    reducers: {
        setProducts(state, action) {
            state.items = action.payload;
            state.filteredItems = action.payload; // Initialize filtered items
        },
        setSelectedCategories(state, action) {
            state.selectedCategories = action.payload;
            state.filteredItems = state.items.filter((product) =>
                action.payload.includes(product.category)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.filteredItems = action.payload; // Initialize filtered items
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // Handle addProducts
            .addCase(addProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // Handle updateProducts
            .addCase(updateProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProducts.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = {
                        ...state.items[index],
                        ...action.payload,
                    };
                }
                state.loading = false;
            })
            .addCase(updateProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // Handle deleteProducts
            .addCase(deleteProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export const { setProducts, setSelectedCategories } = productsSlice.actions;

export default productsSlice.reducer;
