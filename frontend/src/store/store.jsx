import { configureStore, combineReducers } from "@reduxjs/toolkit";
import eventSlice from "./EventStore";
import authSlice from "./AuthStore";

// Combine the reducers
const combinedReducer = combineReducers({
  events: eventSlice,
  auth: authSlice,
});

// Root reducer with reset logic
const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined; // Reset state to initial values on logout
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
