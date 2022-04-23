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
>('selectedProduct/fetchProduct', async (productId, thunkAPI) => {
  try {
    // throw new Error('This is my error');
    const result = (await fakeStoreApi.getProduct(productId)) as Product;
    console.log('result: ', result);
    return result;
  } catch (error) {
    const myError = error as MyKnownError;
    const message = myError?.message || myError.toString();
    return thunkAPI.rejectWithValue({ message });
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
        // This function will be called when createAsyncThunk is aborted (i.e. when the fetch has been aborted).  In this scenario, we do not wish to return an error, we want to force the state to go back to initial state.
        if (action.error.name === 'AbortError') return { ...STATE_INIT };
        return {
          ...STATE_INIT,
          hasLoaded: true,
          error: action.payload ? action.payload : null,
        };
      });
  },
});

export const { clearProduct } = selectedProductSlice.actions;
export { fetchProduct };
export default selectedProductSlice.reducer;
