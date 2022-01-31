import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = { product: null, isLoading: false, error: null };

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState: STATE_INIT,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload || null;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

const selectedProductActions = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
export { selectedProductActions };
