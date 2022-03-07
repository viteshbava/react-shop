import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "../actions/product-actions";

const STATE_INIT = {
  isLoading: false,
  product: null,
  error: null,
};

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState: STATE_INIT,
  reducers: {
    clearProduct() {
      return { ...STATE_INIT };
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PRODUCT - PENDING
      .addCase(fetchProduct.pending, (state) => {
        console.log("Made it to extraReducer, fetchProduct.pending!");
        state.isLoading = true;
      })
      // FETCH PRODUCT - FULLFILLED
      .addCase(fetchProduct.fulfilled, (state, action) => {
        console.log("Made it to extraReducer, fetchProduct.fulfilled!");
        state.product = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      // FETCH PRODUCT - REJECTED
      .addCase(fetchProduct.rejected, (state, action) => {
        console.log("Made it to extraReducer, fetchProduct.rejected!");
        state.product = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      });
  },
});

const selectedProductActions = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
export { selectedProductActions };
