import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../actions/auth-actions';

const STATE_INIT = {
  isLoading: false,
  hasLoaded: false,
  error: null,
  products: [],
  totalQuantity: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: STATE_INIT,

  reducers: {
    replaceWishlist(state, action) {
      const wishlist = action.payload;
      state.products = wishlist;
      state.hasLoaded = true;
    },

    add(state, action) {
      const product = action.payload;
      const foundProduct = state.products.find((p) => p.id === product.id);
      if (!foundProduct) {
        state.products.push(product);
        state.totalQuantity += 1;
      }
    },

    remove(state, action) {
      const productId = action.payload;
      const foundProduct = state.products.find((p) => p.id === productId);
      if (foundProduct) {
        state.products = state.products.filter((p) => p.id !== productId);
        state.totalQuantity -= 1;
      }
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setTotalQuantity(state, action) {
      state.totalQuantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    // CLEAR WISHLIST UPON LOGOUT
    builder.addCase(logout.fulfilled, () => ({ ...STATE_INIT }));
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;
