import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../actions/auth-actions';
import Cart from '../../models/cart';
import Product from '../../models/product';

interface MyKnownError {
  message: string;
}

interface CartState {
  isLoading: boolean;
  hasLoaded: boolean;
  error: MyKnownError | null;
  totalQuantity: number | null;
  totalItemPrice: number | null;
  data: Cart | null;
}

const STATE_INIT: CartState = {
  isLoading: false,
  hasLoaded: false,
  error: null,
  totalQuantity: null,
  totalItemPrice: null,
  data: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: STATE_INIT,

  reducers: {
    replaceCart(state, action) {
      const cart = action.payload;
      return {
        ...state,
        data: cart,
        hasLoaded: true,
        totalQuantity: cart.products.reduce(
          (total: number, p: { data: Product; quantity: number }) =>
            total + p.quantity,
          0
        ),
        totalItemPrice: cart.products.reduce(
          (total: number, p: { data: Product; quantity: number }) =>
            total + p.quantity * p.data.price,
          0
        ),
      };
    },

    add(state, action) {
      const { product, quantity } = action.payload;
      if (!state.data) {
        console.error('Cannot add product to a non-existent cart!');
        return;
      }
      const foundProduct = state.data.products.find(
        (p) => p.data.id === product.id
      );
      if (foundProduct) foundProduct.quantity += quantity;
      else
        state.data.products.push({
          data: product,
          quantity,
        });
      state.totalQuantity += quantity;
      state.totalItemPrice = state.totalItemPrice
        ? state.totalItemPrice + product.price * quantity
        : product.price * quantity;
    },

    remove(state, action) {
      if (
        !state.data ||
        state.totalQuantity === null ||
        state.totalItemPrice === null
      ) {
        console.error('Cannot remove product from a non-existent cart!');
        return;
      }
      const productId = action.payload;
      const foundProduct = state.data.products.find(
        (p) => p.data.id === productId
      );
      if (foundProduct) {
        state.data.products = state.data.products.filter(
          (p) => p.data.id !== productId
        );
        state.totalQuantity -= foundProduct.quantity;
        state.totalItemPrice -= foundProduct.data.price * foundProduct.quantity;
      }
    },

    changeQuantity(state, action) {
      if (
        !state.data ||
        state.totalQuantity === null ||
        state.totalItemPrice === null
      ) {
        console.error('Cannot change product quantity in a non-existent cart!');
        return;
      }
      const { productId, quantity } = action.payload;
      const foundProduct = state.data.products.find(
        (p) => p.data.id === productId
      );
      if (foundProduct) {
        const delta = quantity - foundProduct.quantity;
        foundProduct.quantity = quantity;
        state.totalQuantity += delta;
        state.totalItemPrice += foundProduct.data.price * delta;
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
