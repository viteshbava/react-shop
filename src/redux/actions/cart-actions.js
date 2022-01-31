import { cartActions } from "../slices/cart-slice";
import fakeStoreAPI from "../../apis/fakeStoreApi";

const fetchCartData = (cartId) => async (dispatch) => {
  dispatch(cartActions.isUpdating(true));
  try {
    // Fetch cart data
    const response_cart = await fakeStoreAPI.getCart(cartId);
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
    dispatch(cartActions.isUpdating(false));
    console.error(err.message);
    // ERROR CODE GOES HERE
  }
};

export { fetchCartData };
