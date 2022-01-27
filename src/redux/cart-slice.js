import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = { isUpdating: false, products: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: STATE_INIT,
  reducers: {
    replaceCart(state, action) {
      console.log("replaceCart: has been replaced!");
      const totalQuantity = action.payload.products.reduce(
        (total, p) => total + p.quantity,
        0
      );
      return {
        ...action.payload,
        totalQuantity,
        isUpdating: false,
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
    isUpdating(state, action) {
      state.isUpdating = action.payload;
    },
  },
});

const cartActions = cartSlice.actions;

export default cartSlice.reducer;
export { cartActions };
