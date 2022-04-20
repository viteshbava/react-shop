import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../actions/auth-actions';
import fakeStoreApi from '../../apis/fakeStoreApi_test';

// interface productState

const STATE_INIT = {
  products: null,
  isLoading: false,
  hasLoaded: false,
  error: null,
};

/** ****************************************
createAsyncThunk Actions
****************************************** */

const fetchProducts = createAsyncThunk(
  'allProducts/fetchProducts',
  async (signal: AbortSignal, thunkAPI) => {
    try {
      return await fakeStoreApi.getProducts(signal);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

/** ****************************************
Slice
****************************************** */

const productsSlice = createSlice({
  name: 'products',
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
        state.isLoading = true;
      })
      // FETCH PRODUCTS - FULLFILLED
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.hasLoaded = true;
        state.error = null;
      })
      // FETCH PRODUCTS - REJECTED
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = null;
        state.isLoading = false;
        state.hasLoaded = true;
        state.error = { message: action.payload };
      })
      // CLEAR PRODUCTS ON LOGOUT
      .addCase(logout.fulfilled, () => ({ ...STATE_INIT }));
  },
});

export const { clearAllProducts } = productsSlice.actions;
export { fetchProducts };
export default productsSlice.reducer;
