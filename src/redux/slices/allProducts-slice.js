import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../actions/auth-actions";
import fakeStoreApi from "../../apis/fakeStoreApi_test";
import { createAsyncThunk } from "@reduxjs/toolkit";

const STATE_INIT = {
  products: null,
  isLoading: false,
  error: null,
  fetchController: null,
};

/******************************************
createAsyncThunk Actions
*******************************************/

const fetchProducts = createAsyncThunk(
  "allProducts/fetchProducts",
  async (signal, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log("Signal from fetchProducts: ", signal);
      return await fakeStoreApi.getProducts(signal);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

/******************************************
Slice
*******************************************/

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
      .addCase(fetchProducts.pending, (state, action) => {
        state.abortFetch = action.payload;
        state.isLoading = true;
      })
      // FETCH PRODUCTS - FULLFILLED
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("Products fetching complete!");
        state.products = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      // FETCH PRODUCTS - REJECTED
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log("Products rejected!");
        state.products = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      // CLEAR PRODUCTS ON LOGOUT
      .addCase(logout.fulfilled, () => {
        return { ...STATE_INIT };
      });
  },
});

export const { clearAllProducts } = productsSlice.actions;
export { fetchProducts };
export default productsSlice.reducer;
