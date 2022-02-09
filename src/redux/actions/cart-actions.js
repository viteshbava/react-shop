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
    dispatch(cartActions.setError(err));
    // ERROR CODE GOES HERE
  }
  dispatch(cartActions.isLoading(false));
};

const addToCart = (product, quantity) => async (dispatch) => {
  dispatch(uiActions.showLoadingState(true));
  console.log("TO DO: check if we need to create a new cart");
  const { id: cartId } = store.getState().cart;
  try {
    const result = await fakeStoreAPI.updateCart(cartId, [
      { productId: product.id, quantity },
    ]);
    dispatch(cartActions.add({ product, quantity }));
    dispatch(
      uiActions.showAddToCartSummary({
        itemsAdded: quantity,
      })
    );
  } catch (err) {
    console.error(err);
    // ERROR CODE HERER
    console.log("TO DO: add to cart error alert");
  }
  dispatch(uiActions.showLoadingState(false));
};

const removeFromCart = (productId) => async (dispatch) => {
  console.log("removeFromCart TO DO: show confirm modal");
  console.log("removeFromCart TO DO: show loading state");

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
    console.error(err);
    // ERROR CODE HERER
    console.log("TO DO: add to cart error alert");
  }
};

export { fetchCart, addToCart, removeFromCart };
