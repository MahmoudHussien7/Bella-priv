// CartSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getDoc,
    doc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";

// Function to save cart state to localStorage
const saveCartToLocalStorage = (state) => {
    try {
        const cartProducts = state.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
        }));
        localStorage.setItem("cart", JSON.stringify(cartProducts));
    } catch (e) {
        console.warn("Failed to save cart to localStorage", e);
    }
};

// Function to load the cart state from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem("cart");
        const loadedItems = serializedCart ? JSON.parse(serializedCart) : [];
        const items = loadedItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
        }));
        return {
            items,
            totalQuantity: calculateTotalQuantity(items),
            totalPrice: 0, // Price will be recalculated later when data is fetched from the server
        };
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

// Thunk to update Firebase cart
export const updateFirebaseCart = createAsyncThunk(
    "cart/updateFirebaseCart",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const user = state.auth.userDetails;

            if (!user) {
                return;
            }

            const userId = user.userId;
            const cartItems = state.cart.items;

            const cartProducts = cartItems.map((item) => ({
                id: item.id,
                quantity: item.quantity,
            }));

            await setDoc(
                doc(db, "users", userId),
                { cartProducts },
                { merge: true }
            );
        } catch (error) {
            console.error("Failed to update cart in Firebase", error);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to initialize the cart
export const initializeCart = createAsyncThunk(
    "cart/initializeCart",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const user = state.auth.userDetails;

            if (!user) {
                // User is not logged in, load cart from localStorage
                const localCart = loadCartFromLocalStorage() || {
                    items: [],
                    totalQuantity: 0,
                    totalPrice: 0,
                };
                return localCart;
            } else {
                // User is logged in, fetch cart from Firebase
                const userId = user.userId;
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                let firebaseCartProducts = [];
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    firebaseCartProducts = userData.cartProducts || [];
                }

                // Load cart from localStorage
                const localCart = loadCartFromLocalStorage() || {
                    items: [],
                    totalQuantity: 0,
                    totalPrice: 0,
                };

                // Merge carts
                const itemMap = {};

                // Add items from localCart
                for (const item of localCart.items) {
                    itemMap[item.id] = item;
                }

                // Prepare list of product IDs to fetch
                const idsToFetch = [];

                // Update quantities and collect IDs to fetch
                for (const product of firebaseCartProducts) {
                    const { id, quantity } = product;
                    if (itemMap[id]) {
                        // Update quantity to the maximum between local and firebase quantities
                        itemMap[id].quantity = Math.max(
                            itemMap[id].quantity,
                            quantity
                        );
                    } else {
                        // Need to fetch product details
                        idsToFetch.push(id);
                    }
                }

                // Fetch product details in batch
                let fetchedProducts = [];
                if (idsToFetch.length > 0) {
                    const productChunks = [];
                    const chunkSize = 10; // Firestore limits 'in' queries to 10
                    for (let i = 0; i < idsToFetch.length; i += chunkSize) {
                        productChunks.push(idsToFetch.slice(i, i + chunkSize));
                    }

                    for (const chunk of productChunks) {
                        const q = query(
                            collection(db, "products"),
                            where("__name__", "in", chunk)
                        );
                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((doc) => {
                            const productData = doc.data();
                            fetchedProducts.push({
                                id: doc.id,
                                title: productData.title,
                                imageUrl: productData.imageUrl,
                                price: productData.price,
                                quantity:
                                    firebaseCartProducts.find(
                                        (p) => p.id === doc.id
                                    )?.quantity || 0,
                                stockquantity: productData.stockquantity,
                            });
                        });
                    }
                }

                // Add fetched products to itemMap
                for (const product of fetchedProducts) {
                    itemMap[product.id] = product;
                }

                // Now itemMap contains merged items
                const mergedItems = Object.values(itemMap);

                // Recalculate totals
                const totalQuantity = calculateTotalQuantity(mergedItems);
                const totalPrice = calculateTotalPrice(mergedItems);

                // Save updated cart to Firebase
                const cartProducts = mergedItems.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                }));

                await setDoc(
                    doc(db, "users", userId),
                    { cartProducts },
                    { merge: true }
                );

                // Save updated cart to localStorage
                const updatedState = {
                    items: mergedItems,
                    totalQuantity,
                    totalPrice,
                };
                saveCartToLocalStorage(updatedState);

                return updatedState;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, title, imageUrl, price, stockquantity } =
                action.payload;

            // Check if an item with the same id exists
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                // Increment quantity by 1
                // existingItem.quantity += 1;
            } else {
                state.items.push({
                    id,
                    title,
                    imageUrl,
                    price,
                    quantity: 1,
                    stockquantity,
                });
            }

            // Recalculate totals after adding item
            state.totalQuantity = calculateTotalQuantity(state.items);
            state.totalPrice = calculateTotalPrice(state.items);

            // Save updated state to localStorage
            saveCartToLocalStorage(state);
        },

        adjustQuantity: (state, action) => {
            const { id, quantity, stockquantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item && quantity > 0 && quantity <= stockquantity) {
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
    extraReducers: (builder) => {
        builder
            .addCase(initializeCart.fulfilled, (state, action) => {
                const { items, totalQuantity, totalPrice } = action.payload;
                state.items = items;
                state.totalQuantity = totalQuantity;
                state.totalPrice = totalPrice;
            })
            .addCase(initializeCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase("auth/logoutUser/fulfilled", (state) => {
                state.items = [];
                state.totalQuantity = 0;
                state.totalPrice = 0;
                saveCartToLocalStorage(state);
            });
    },
});

// Middleware to sync cart with Firebase when cart changes
export const cartMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    const cartActions = [
        "cart/addToCart",
        "cart/adjustQuantity",
        "cart/removeFromCart",
        "cart/clearCart",
    ];

    if (cartActions.includes(action.type)) {
        const state = store.getState();
        const user = state.auth.userDetails;

        if (user) {
            const cartItems = state.cart.items;

            const cartProducts = cartItems.map((item) => ({
                id: item.id,
                quantity: item.quantity,
            }));

            // Update Firebase
            setDoc(
                doc(db, "users", user.userId),
                { cartProducts },
                { merge: true }
            ).catch((error) => {
                console.error("Failed to update cart in Firebase", error);
            });
        }
    }

    return result;
};

export const { addToCart, removeFromCart, clearCart, adjustQuantity } =
    cartSlice.actions;
export default cartSlice.reducer;
