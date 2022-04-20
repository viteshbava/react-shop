import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../actions/auth-actions';
import fakeStoreApi from '../../apis/fakeStoreApi_test';
import Product from '../../models/product';

interface MyKnownError {
  message: string;
}
interface AllProductsState {
  products: Product[] | null;
  isLoading: boolean;
  hasLoaded: boolean;
  error: MyKnownError | null;
}

const STATE_INIT: AllProductsState = {
  products: null,
  isLoading: false,
  hasLoaded: false,
  error: null,
};

/** ****************************************
createAsyncThunk Actions
****************************************** */

const fetchProducts = createAsyncThunk<
  Product[],
  AbortSignal,
  { rejectValue: MyKnownError }
>('allProducts/fetchProducts', async (signal, thunkAPI) => {
  try {
    return (await fakeStoreApi.getProducts(signal)) as Product[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.message || (error.toString() as MyKnownError)
    );
  }
});

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
        state.error = action.payload
          ? action.payload
          : { message: 'Unable to Fetch Products!' };
      })
      // CLEAR PRODUCTS ON LOGOUT
      .addCase(logout.fulfilled, () => ({ ...STATE_INIT }));
  },
});

export const { clearAllProducts } = productsSlice.actions;
export { fetchProducts };
export default productsSlice.reducer;
