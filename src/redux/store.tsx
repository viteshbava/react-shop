import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cart-slice';
import allProductsReducer from './slices/allProducts-slice';
import selectedProductReducer from './slices/selectedProduct-slice';
import uiReducer from './slices/ui-slice';
import wishlistReducer from './slices/wishlist-slice';
import authReducer from './slices/auth-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    cart: cartReducer,
    products: allProductsReducer,
    selectedProduct: selectedProductReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
