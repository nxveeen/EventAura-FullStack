import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://127.0.0.1:5000/events";

const initialState = {
  events: [],
  status: "idle",
  error: null,
  selectedEvent: null,
};

// Get all events from API
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch events.");
  }
  const data = await res.json();
  return data;
});

// Get single event by ID from API
export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch event by ID.");
    }
    const data = await res.json();
    return data;
  }
);

// Upload new event
export const uploadEvent = createAsyncThunk(
  "events/uploadEvent",
  async (newEvent) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    if (!res.ok) {
      throw new Error("Failed to upload new event.");
    }
    const data = await res.json();

    return data;
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.selectedEvent = action.payload;
      })
      .addCase(uploadEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events.push(action.payload);
      })
      .addCase(uploadEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllEvents = (state) => state.events.events;
export const getEventStatus = (state) => state.events.status;
export const getEventError = (state) => state.events.error;
export const getSelectedEvent = (state) => state.events.selectedEvent;

export const { addEvent, editEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;
