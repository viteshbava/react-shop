import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = {
  isLoading: false,
  error: null,
  products: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: STATE_INIT,
  reducers: {
    replaceCart(state, action) {
      console.log("replaceCart: has been replaced!");
      return {
        ...state,
        ...action.payload,
      };
    },
    add(state, action) {
      console.log("Adding product to cart!");
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
