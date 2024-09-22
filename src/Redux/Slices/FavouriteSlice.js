import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { fetchUserData } from "../Slices/AuthSlice";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const toggleFavourite = createAsyncThunk(
  "favourites/toggleFavourite",
  async (productId, { getState, dispatch }) => {
    const state = getState();
    const { userDetails } = state.auth;
    const existingItemIndex = state.favourites.items.indexOf(productId);

    let updatedItems;
    if (existingItemIndex !== -1) {
      updatedItems = state.favourites.items.filter((id) => id !== productId);
    } else {
      updatedItems = [...state.favourites.items, productId];
    }

    // Update Firestore
    await dispatch(
      updateFavoriteProductsByUserId({
        userId: userDetails.userId,
        favoriteProducts: updatedItems,
      })
    );

    return updatedItems;
  }
);

export const updateFavoriteProductsByUserId = createAsyncThunk(
  "favourites/updateFavoriteProductsByUserId",
  async ({ userId, favoriteProducts }, { rejectWithValue }) => {
    try {
      if (!Array.isArray(favoriteProducts)) {
        throw new Error("favoriteProducts must be an array");
      }

      const q = query(collection(db, "users"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);
      await updateDoc(userRef, { favoriteProducts });

      console.log("Favorites updated successfully");
      return favoriteProducts;
    } catch (error) {
      console.error("Error updating favorites:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.items = action.payload.userDetails.favoriteProducts || [];
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateFavoriteProductsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFavoriteProductsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(updateFavoriteProductsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default favouriteSlice.reducer;
