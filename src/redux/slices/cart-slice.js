import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../actions/auth-actions';

const STATE_INIT = {
  isLoading: false,
  hasLoaded: false,
  error: null,
  products: [],
  totalQuantity: null,
  totalItemPrice: null,
  id: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: STATE_INIT,

  reducers: {
    replaceCart(state, action) {
      const { products } = action.payload;
      return {
        ...state,
        ...action.payload,
        hasLoaded: true,
        totalQuantity: products.reduce((total, p) => total + p.quantity, 0),
        totalItemPrice: products.reduce(
          (total, p) => total + p.quantity * p.price,
          0
        ),
      };
    },

    add(state, action) {
      const { product, quantity } = action.payload;
      const foundProduct = state.products.find((p) => p.id === product.id);
      if (foundProduct) foundProduct.quantity += quantity;
      else
        state.products.push({
          ...product,
          quantity,
        });
      state.totalQuantity += quantity;
      state.totalItemPrice += product.price * quantity;
    },

    remove(state, action) {
      const productId = action.payload;
      const foundProduct = state.products.find((p) => p.id === productId);
      if (foundProduct) {
        state.products = state.products.filter((p) => p.id !== productId);
        state.totalQuantity -= foundProduct.quantity;
        state.totalItemPrice -= foundProduct.price * foundProduct.quantity;
      }
    },
    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const foundProduct = state.products.find((p) => p.id === productId);
      if (foundProduct) {
        const delta = quantity - foundProduct.quantity;
        foundProduct.quantity = quantity;
        state.totalQuantity += delta;
        state.totalItemPrice += foundProduct.price * delta;
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
    clearCart() {
      return { ...STATE_INIT, totalQuantity: 0, totalItemPrice: 0 };
    },
  },
  extraReducers: (builder) => {
    // CLEAR CART ON LOGOUT
    builder.addCase(logout.fulfilled, () => ({
      ...STATE_INIT,
      totalQuantity: 0,
      totalItemPrice: 0,
    }));
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
