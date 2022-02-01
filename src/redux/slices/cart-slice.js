import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = {
  isLoading: false,
  error: null,
  products: [],
  totalQuantity: 0,
  id: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: STATE_INIT,

  reducers: {
    replaceCart(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    add(state, action) {
      const foundProduct = state.products.find(
        (p) => p.id === action.payload.product.id
      );
      foundProduct
        ? (foundProduct.quantity += action.payload.quantity)
        : state.products.push({
            ...action.payload.product,
            quantity: action.payload.quantity,
          });
      state.totalQuantity += action.payload.quantity;
    },

    remove(state, action) {
      console.log("Removing product from cart!");
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
