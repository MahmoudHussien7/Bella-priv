import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs,
    deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { clearCart, initializeCart } from "./CartSlice";

// Register user
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ userEmail, password, userName, role }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userEmail,
                password
            );
            const user = userCredential.user;
            const userId = user.uid;

            const userDetails = {
                userName,
                userEmail,
                userId,
                cartProducts: [],
                favoriteProducts: [],
                role: role || "user",
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, "users", userId), userDetails);
            return { user, userDetails };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Login user with persistence and loading handling
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ userEmail, password }, { dispatch, rejectWithValue }) => {
        try {
            // Set persistence to ensure the user remains logged in across sessions
            await setPersistence(auth, browserLocalPersistence);

            const userCredential = await signInWithEmailAndPassword(
                auth,
                userEmail,
                password
            );
            const user = userCredential.user;

            // Adding a 2-second delay to ensure the data is ready, especially for admins
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userDetails = docSnap.data();
                dispatch(initializeCart());
                return { user, userDetails };
            } else {
                return rejectWithValue("User document does not exist");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch }) => {
        await signOut(auth);
        dispatch(clearCart());
    }
);

// Fetch all users
export const fetchUsers = createAsyncThunk(
    "auth/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return usersList;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch specific user data by UID
export const fetchUserData = createAsyncThunk(
    "auth/fetchUserData",
    async (uid, { rejectWithValue }) => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userDetails = docSnap.data();
                return { userDetails };
            } else {
                return rejectWithValue("User document does not exist");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update user details
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { userDetails } = getState().auth;
            if (!userDetails) throw new Error("User not authenticated");

            await setDoc(doc(db, "users", userDetails.userId), userData, {
                merge: true,
            });
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete user
export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            const userDocRef = doc(db, "users", userId);
            await deleteDoc(userDocRef);
            return userId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update user profile image
export const updateUserProfileImage = createAsyncThunk(
    "auth/updateUserProfileImage",
    async ({ userId, imageFile }, { rejectWithValue }) => {
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `profileImages/${userId}`);

            await uploadBytes(storageRef, imageFile);
            const imageUrl = await getDownloadURL(storageRef);

            const userDocRef = doc(db, "users", userId);
            await setDoc(
                userDocRef,
                { profileImageUrl: imageUrl },
                { merge: true }
            );

            return { userId, imageUrl };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        userDetails: null,
        loading: false,
        error: null,
        role: null,
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.userDetails = action.payload.userDetails;
                state.role = action.payload.userDetails.role;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.userDetails = action.payload.userDetails;
                state.role = action.payload.userDetails.role;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout user
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.userDetails = null;
                state.role = null;
            })

            // Fetch user data
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload.userDetails;
                state.role = action.payload.userDetails.role;
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.loading = false;
            })

            // Fetch all users
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = { ...state.userDetails, ...action.payload };
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete user
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user.id !== action.payload
                );
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Update user profile image
            .addCase(updateUserProfileImage.fulfilled, (state, action) => {
                const index = state.users.findIndex(
                    (user) => user.id === action.payload.userId
                );
                if (index !== -1) {
                    state.users[index] = {
                        ...state.users[index],
                        profileImageUrl: action.payload.imageUrl,
                    };
                }
                state.userDetails.profileImageUrl = action.payload.imageUrl;
            })
            .addCase(updateUserProfileImage.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
