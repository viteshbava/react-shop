import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../actions/auth-actions";
import { fetchProducts } from "../actions/product-actions";

const STATE_INIT = { products: null, isLoading: false, error: null };

const productsSlice = createSlice({
  name: "products",
  initialState: STATE_INIT,
  reducers: {
    clearAllProducts() {
      return { ...STATE_INIT };
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PRODUCTS - PENDING
      .addCase(fetchProducts.pending, (state) => {
        console.log("Made it to extraReducer, fetchProducts.pending!");
        state.isLoading = true;
      })
      // FETCH PRODUCTS - FULLFILLED
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("Made it to extraReducer, fetchProducts.fulfilled!");
        state.products = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      // FETCH PRODUCTS - REJECTED
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log("Made it to extraReducer, fetchProducts.rejected!");
        state.products = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      .addCase(logout.fulfilled, () => {
        return { ...STATE_INIT };
      });
  },
});

const productsActions = productsSlice.actions;

export default productsSlice.reducer;
export { productsActions };
