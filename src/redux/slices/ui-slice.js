import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = {
  addToCartSummary: null,
  alerts: {
    _id: 0,
    alerts: [],
  },
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: STATE_INIT,
  reducers: {
    showAddToCartSummary(state, action) {
      state.addToCartSummary = action.payload;
    },
    addAlert(state, action) {
      state.alerts.alerts.unshift({
        ...action.payload,
        id: state.alerts._id++,
      });
    },
    removeAlert(state, action) {
      const alertId = action.payload;
      const foundAlert = state.alerts.alerts.find((a) => a.id === alertId);
      if (foundAlert)
        state.alerts.alerts = state.alerts.alerts.filter(
          (a) => a.id !== alertId
        );
    },
    showLoadingState(state, action) {
      state.loading = action.payload;
    },
  },
});

const uiActions = uiSlice.actions;

export default uiSlice.reducer;
export { uiActions };
