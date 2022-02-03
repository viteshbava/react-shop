import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = {
  isLoading: false,
  error: null,
  products: [],
  totalQuantity: 0,
  totalItemPrice: 0,
  id: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: STATE_INIT,

  reducers: {
    replaceCart(state, action) {
      const { products } = action.payload;
      return {
        ...state,
        ...action.payload,
        totalItemPrice: products.reduce(
          (total, p) => total + p.quantity * p.price,
          0
        ),
      };
    },

    add(state, action) {
      const { product, quantity } = action.payload;
      const foundProduct = state.products.find((p) => p.id === product.id);
      foundProduct
        ? (foundProduct.quantity += quantity)
        : state.products.push({
            ...product,
            quantity: quantity,
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
      console.log("Changing quantity of product in cart!");
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
});

const cartActions = cartSlice.actions;

export default cartSlice.reducer;
export { cartActions };