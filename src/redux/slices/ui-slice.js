import { createSlice } from "@reduxjs/toolkit";
import { ALERT_TYPE } from "../../components/UI/Alert/Alert";

const STATE_INIT = {
  addToCartSummary: null,
  alerts: [
    // {
    //   type: ALERT_TYPE.ERROR,
    //   title: "A Test Error Alert",
    //   message:
    //     "An error occured while you were doing that.  Please try again later.",
    // },
    // {
    //   type: ALERT_TYPE.INFO,
    //   title: "A Test Info Alert",
    //   message:
    //     "Something occured while you were doing that.  Please try again later.",
    // },
    // {
    //   type: ALERT_TYPE.SUCCESS,
    //   title: "A Test Success Alert",
    //   message:
    //     "If you would now like to do something else, please start again.",
    // },
    // {
    //   type: ALERT_TYPE.WARNING,
    //   title: "A Test Warning Alert",
    //   message:
    //     "Something occured while you were doing that.  Please try again later.",
    // },
  ],
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: STATE_INIT,
  reducers: {
    showAddToCartSummary(state, action) {
      state.addToCartSummary = action.payload;
    },
    showAlert(state, action) {
      const { type, title, message } = action.payload;
      state.alerts = { type, title, message };
    },
    showLoadingState(state, action) {
      state.loading = action.payload;
    },
  },
});

const uiActions = uiSlice.actions;

export default uiSlice.reducer;
export { uiActions };
