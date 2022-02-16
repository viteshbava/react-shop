import { cartActions } from "../slices/cart-slice";
import { uiActions } from "../slices/ui-slice";
import { ALERT_TYPE } from "../../components/UI/Alert/Alert";
import fakeStoreAPI from "../../apis/fakeStoreApi";
import store from "../store";

const fetchUserCart = (userId) => async (dispatch) => {
  dispatch(cartActions.isLoading(true));
  try {
    const cartId = await fetchCartForUser(userId);
    if (cartId) {
      const cart_data = await fetchCartData(cartId, dispatch);
      const cart_products = await fetchCartProducts(cart_data.products);
      // Swap product array in cart with new product data array
      cart_data.products = cart_products;
      // Update cart in Redux
      dispatch(cartActions.replaceCart(cart_data));
    } else dispatch(cartActions.clearCart());
  } catch (err) {
    dispatch(cartActions.setError({ message: err.message }));
    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.ERROR,
        title: "Unable to fetch cart data!",
      })
    );
    console.error(err);
  }
  dispatch(cartActions.isLoading(false));
};

const fetchCartForUser = async (userId) => {
  // Fetch array of carts for supplied userId
  const user_carts = await fakeStoreAPI.getUserCarts(userId);
  // Assume that first element in array is the current cart for practice purposes.
  // In reality the API should somehow define the 'current' cart separately from 'cart history'
  return user_carts.length ? user_carts[0].id : null;
};

const fetchCartData = async (cartId, dispatch) => {
  // Fetch cart data
  const cart_data = await fakeStoreAPI.getCart(cartId);
  // Update total quantity
  const totalQuantity = cart_data.products.reduce(
    (total, p) => total + p.quantity,
    0
  );
  // Display total quantity as we load products
  dispatch(cartActions.setTotalQuantity(totalQuantity));
  return cart_data;
};

const fetchCartProducts = async (cartProducts) => {
  // Fetch product data for each item in cart
  const promises = cartProducts.map(async (p) => {
    const response_product = await fakeStoreAPI.getProduct(p.productId);
    return {
      ...response_product,
      quantity: p.quantity,
    };
  });
  // return array of products
  return await Promise.all(promises);
};

const addToCart =
  ({ product, quantity, onAddSuccess, onAddError }) =>
  async (dispatch) => {
    dispatch(uiActions.showLoadingState(true));
    console.log("TO DO: check if we need to create a new cart");
    const { id: cartId } = store.getState().cart;
    try {
      const result = await fakeStoreAPI.updateCart(cartId, [
        { productId: product.id, quantity },
      ]);
      dispatch(cartActions.add({ product, quantity }));
      dispatch(uiActions.showLoadingState(false));
      if (onAddSuccess) onAddSuccess();
    } catch (err) {
      dispatch(uiActions.showLoadingState(false));
      if (onAddError) onAddError(err);
      dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.ERROR,
          title: "Failed to add to cart!",
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
      const result = await fakeStoreAPI.updateCart(cartId, [
        { productId, quantity },
      ]);
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
          title: "Unable to change quantity!",
        })
      );
      console.log(onError);
      if (onError) onError();
      console.error(err);
    }
    dispatch(uiActions.showLoadingState(false));
  };

const removeFromCart = (productId) => async (dispatch) => {
  dispatch(uiActions.showLoadingState(true));
  const { id: cartId } = store.getState().cart;

  try {
    const result = await fakeStoreAPI.updateCart(cartId, [
      { productId, quantity: 0 },
    ]);
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
        title: "Unable to remove item from cart!",
      })
    );
    console.error(err);
  }
  dispatch(uiActions.showLoadingState(false));
};

export { fetchUserCart, addToCart, removeFromCart, changeQuantity };
