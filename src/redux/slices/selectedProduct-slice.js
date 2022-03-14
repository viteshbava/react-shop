import { createSlice } from "@reduxjs/toolkit";
import fakeStoreApi from "../../apis/fakeStoreApi_test";
import { createAsyncThunk } from "@reduxjs/toolkit";

const STATE_INIT = {
  isLoading: false,
  product: null,
  error: null,
};

/******************************************
createAsyncThunk Actions
*******************************************/

const fetchProduct = createAsyncThunk(
  "allProducts/fetchProduct",
  async (productId, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return await fakeStoreApi.getProduct(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

/******************************************
Slice
*******************************************/

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
        state.isLoading = true;
      })
      // FETCH PRODUCT - FULLFILLED
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      // FETCH PRODUCT - REJECTED
      .addCase(fetchProduct.rejected, (state, action) => {
        state.product = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      });
  },
});

export const { clearProduct } = selectedProductSlice.actions;
export { fetchProduct };
export default selectedProductSlice.reducer;
