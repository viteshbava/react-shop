import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = {
  addToCartSummary: null,
  notification: null,
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: STATE_INIT,
  reducers: {
    showAddToCartSummary(state, action) {
      state.addToCartSummary = action.payload;
    },
    showNotification(state, action) {
      const { status, title, message } = action.payload;
      state.notification = { status, title, message };
    },
    showLoadingState(state, action) {
      state.loading = action.payload;
    },
  },
});

const uiActions = uiSlice.actions;

export default uiSlice.reducer;
export { uiActions };
