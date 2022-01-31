import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = { products: [], isLoading: false, error: null };

const productsSlice = createSlice({
  name: "products",
  initialState: STATE_INIT,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload || [];
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

const productsActions = productsSlice.actions;

export default productsSlice.reducer;
export { productsActions };
