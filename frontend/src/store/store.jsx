import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./EventStore";

export default configureStore({
  reducer: {
    events: eventSlice,
  },
});
