import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart-slice";
import productsReducer from "./products-slice";

const store = configureStore({
  reducer: { cart: cartReducer, products: productsReducer },
});

export default store;
