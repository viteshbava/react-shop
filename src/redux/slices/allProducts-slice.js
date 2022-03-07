import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../actions/auth-actions";

const STATE_INIT = { products: null, isLoading: false, error: null };

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
    clearAllProducts(state, action) {
      return { ...STATE_INIT };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => {
      return { ...STATE_INIT };
    });
  },
});

const productsActions = productsSlice.actions;

export default productsSlice.reducer;
export { productsActions };
