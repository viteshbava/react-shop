import { createSlice } from "@reduxjs/toolkit";

const STATE_INIT = {
  products: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: STATE_INIT,
  reducers: {
    replaceCart(state, action) {
      console.log("Replacing cart!");
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
  },
});

const cartActions = cartSlice.actions;

export default cartSlice.reducer;
export { cartActions };
