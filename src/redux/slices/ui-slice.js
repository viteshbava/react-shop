import { createSlice } from '@reduxjs/toolkit';

const STATE_INIT = {
  alerts: {
    _id: 0,
    alerts: [],
  },
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: STATE_INIT,
  reducers: {
    addAlert(state, action) {
      const newAlert = action.payload;
      const currAlertId = state.alerts._id;
      state.alerts.alerts.unshift({
        ...newAlert,
        id: currAlertId,
      });
      state.alerts._id += 1;
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
