import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fakeStoreApi from '../../apis/fakeStoreApi_test';
import Product from '../../models/product';

interface MyKnownError {
  message: string;
}

interface SelectedProductState {
  isLoading: boolean;
  hasLoaded: boolean;
  product: Product | null;
  error: MyKnownError | null;
}

const STATE_INIT: SelectedProductState = {
  isLoading: false,
  hasLoaded: false,
  product: null,
  error: null,
};

/** ****************************************
createAsyncThunk Actions
****************************************** */

const fetchProduct = createAsyncThunk<
  Product,
  number,
  { rejectValue: MyKnownError }
>('allProducts/fetchProduct', async (productId, thunkAPI) => {
  try {
    console.log('Getting product...');
    const result = (await fakeStoreApi.getProduct(productId)) as Product;
    console.log('result: ', result);
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.message || (error.toString() as MyKnownError)
    );
  }
});

/** ****************************************
Slice
****************************************** */

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
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
        state.hasLoaded = true;
        state.error = null;
      })
      // FETCH PRODUCT - REJECTED
      .addCase(fetchProduct.rejected, (state, action) => {
        console.log('Setting reject error now...');
        state.product = null;
        state.isLoading = false;
        state.hasLoaded = true;
        state.error = action.payload
          ? action.payload
          : { message: 'Unable to Fetch Product!' };
      });
  },
});

export const { clearProduct } = selectedProductSlice.actions;
export { fetchProduct };
export default selectedProductSlice.reducer;
