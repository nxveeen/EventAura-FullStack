import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://127.0.0.1:5000/auth";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: null,
  error: null,
};

// export const initializeAuthToken = () => {
//   token = localStorage.getItem("authToken");
// };

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (credentials) => {
    // augmented delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // ----
    try {
      const res = await fetch(BASE_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        throw new Error("Login failed!");
      }
      const data = await res.json();
      // console.log("yes");
      console.log(data);

      return data; // This will be the payload for login.fulfilled
    } catch (error) {
      return rejectWithValue(error.message); // Passes the error message to login.rejected
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials) => {
    try {
      const res = fetch(BASE_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.tokens.access;
        localStorage.setItem("authToken", action.payload.tokens.access);
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("RESET", () => initialState); // Reset state after logout
  },
});

export const getUser = (state) => state.auth.user;
export const getUserAuthenticated = (state) => state.auth.isAuthenticated;
export const getUserLoading = (state) => state.auth.loading;
export const getUserError = (state) => state.auth.error;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
