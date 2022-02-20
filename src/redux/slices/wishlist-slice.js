import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = {
  isLoading: false,
  loadingProduct: null,
  error: null,
  products: [],
  totalQuantity: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: STATE_INIT,

  reducers: {
    replaceWishlist(state, action) {
      const wishlist = action.payload;
      state.products = wishlist;
    },

    add(state, action) {
      const product = action.payload;
      const foundProduct = state.products.find((p) => p.id === product.id);
      if (!foundProduct) {
        state.products.push(product);
        state.totalQuantity++;
      }
    },

    remove(state, action) {
      const productId = action.payload;
      const foundProduct = state.products.find((p) => p.id === productId);
      if (foundProduct) {
        state.products = state.products.filter((p) => p.id !== productId);
        state.totalQuantity--;
      }
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    loadingProduct(state, action) {
      const productId = action.payload;
      state.loadingProduct = productId;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setTotalQuantity(state, action) {
      state.totalQuantity = action.payload;
    },
  },
});

const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
export { wishlistActions };
