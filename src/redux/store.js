import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cart-slice";
import allProductsReducer from "./slices/allProducts-slice";
import selectedProductReducer from "./slices/selectedProduct-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: allProductsReducer,
    selectedProduct: selectedProductReducer,
  },
});

export default store;
