import { cartActions } from "../slices/cart-slice";
import { uiActions } from "../slices/ui-slice";
import { ALERT_TYPE } from "../../components/UI/Alert/Alert";
import fakeStoreAPI from "../../apis/fakeStoreApi";
import store from "../store";

const fetchCart = (cartId) => async (dispatch) => {
  dispatch(cartActions.isLoading(true));
  try {
    // Fetch cart data
    const response_cart = await fakeStoreAPI.getCart(cartId);
    // Update total quantity
    const totalQuantity = response_cart.products.reduce(
      (total, p) => total + p.quantity,
      0
    );
    dispatch(cartActions.setTotalQuantity(totalQuantity));
    // Fetch product data for each item in cart and store in temp array
    const productDataArr = [];
    for (const product of response_cart.products) {
      const response_product = await fakeStoreAPI.getProduct(product.productId);
      productDataArr.push({
        ...response_product,
        quantity: product.quantity,
      });
    }
    // Swap product array in cart with product data array
    response_cart.products = productDataArr;
    // Update Redux state with cart
    dispatch(cartActions.replaceCart(response_cart));
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

export { fetchCart, addToCart, removeFromCart, changeQuantity };
