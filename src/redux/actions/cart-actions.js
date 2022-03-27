import { cartActions } from '../slices/cart-slice';
import { uiActions } from '../slices/ui-slice';
import { ALERT_TYPE } from '../../components/Feedback/Alert/Alert';
import fakeStoreApi from '../../apis/fakeStoreApi_test';
import store from '../store';

/** ********************************************************
/**********************************************************
  Helper functions for cart-actions  
********************************************************* */
/** ******************************************************* */

const _fetchCartForUser = async (userId, abortSignal) => {
  // Fetch array of carts for supplied userId
  const userCarts = await fakeStoreApi.getUserCarts(userId, abortSignal);
  // Assume that first element in array is the current cart for practice purposes.
  // In reality the API should somehow define the 'current' cart separately from 'cart history'
  return userCarts.length ? userCarts[0].id : null;
};

const _fetchCartData = async (cartId, abortSignal, dispatch) => {
  // Fetch cart data
  const cartData = await fakeStoreApi.getCart(cartId, abortSignal);
  // Update total quantity
  const totalQuantity = cartData.products.reduce(
    (total, p) => total + p.quantity,
    0
  );
  // Display total quantity as we load products
  dispatch(cartActions.setTotalQuantity(totalQuantity));
  return cartData;
};

const _fetchCartProducts = async (cartProducts, abortSignal) => {
  // Fetch product data for each item in cart
  const promises = cartProducts.map(async (p) => {
    const responseProduct = await fakeStoreApi.getProduct(
      p.productId,
      abortSignal
    );
    return {
      ...responseProduct,
      quantity: p.quantity,
    };
  });
  // return array of products
  const productArray = await Promise.all(promises);
  return productArray;
};

const _createNewCart = async (userId, product, quantity, dispatch) => {
  const newCart = await fakeStoreApi.createUserCart({
    userId,
    date: new Date(),
    products: [{ productId: product.id, quantity }],
  });
  newCart.products = [{ ...product, quantity }];
  dispatch(cartActions.replaceCart(newCart));
};

const _updateCart = async (cartId, product, quantity, dispatch) => {
  await fakeStoreApi.updateCart(cartId, [{ productId: product.id, quantity }]);
  dispatch(cartActions.add({ product, quantity }));
};

/** ********************************************************
/**********************************************************
  Cart Actions
********************************************************* */
/** ******************************************************* */

const fetchUserCart = (userId, abortSignal) => async (dispatch) => {
  dispatch(cartActions.isLoading(true));
  try {
    const cartId = await _fetchCartForUser(userId, abortSignal);
    if (cartId) {
      const cartData = await _fetchCartData(cartId, abortSignal, dispatch);
      const cartProducts = await _fetchCartProducts(
        cartData.products,
        abortSignal
      );
      // Swap product array in cart with new product data array
      cartData.products = cartProducts;
      // Update cart in Redux
      dispatch(cartActions.replaceCart(cartData));
    } else dispatch(cartActions.clearCart());
  } catch (err) {
    if (err.name !== 'AbortError') {
      dispatch(cartActions.setError({ message: err.message }));
      dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.ERROR,
          title: 'Unable to fetch cart data!',
        })
      );
      console.error(err);
    }
  }
  dispatch(cartActions.isLoading(false));
};

const addToCart =
  ({ product, quantity, onAddSuccess, onAddError }) =>
  async (dispatch) => {
    dispatch(uiActions.showLoadingState(true));
    const { id: cartId } = store.getState().cart;
    const userId = 5; /* This is a dummy userID until authentication is built; we should be getting it from state */
    try {
      if (cartId) await _updateCart(cartId, product, quantity, dispatch);
      else await _createNewCart(userId, product, quantity, dispatch);
      dispatch(uiActions.showLoadingState(false));
      if (onAddSuccess) onAddSuccess();
    } catch (err) {
      dispatch(uiActions.showLoadingState(false));
      if (onAddError) onAddError(err);
      dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.ERROR,
          title: 'Failed to add to cart!',
        })
      );
      console.error(err);
    }
  };

const changeQuantity =
  ({ productId, quantity, onError }) =>
  async (dispatch) => {
    dispatch(uiActions.showLoadingState(true));
    const { id: cartId } = store.getState().cart;
    try {
      await fakeStoreApi.updateCart(cartId, [{ productId, quantity }]);
      dispatch(cartActions.changeQuantity({ productId, quantity }));
      dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: `Item quantity changed`,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.ERROR,
          title: 'Unable to change quantity!',
        })
      );
      if (onError) onError();
      console.error(err);
    }
    dispatch(uiActions.showLoadingState(false));
  };

const removeFromCart = (productId) => async (dispatch) => {
  dispatch(uiActions.showLoadingState(true));
  const { id: cartId } = store.getState().cart;

  try {
    await fakeStoreApi.updateCart(cartId, [{ productId, quantity: 0 }]);
    dispatch(cartActions.remove(productId));
    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: `Item removed from cart`,
      })
    );
  } catch (err) {
    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.ERROR,
        title: 'Unable to remove item from cart!',
      })
    );
    console.error(err);
  }
  dispatch(uiActions.showLoadingState(false));
};

export { fetchUserCart, addToCart, removeFromCart, changeQuantity };
