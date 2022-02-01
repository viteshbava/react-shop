import { cartActions } from "../slices/cart-slice";
import fakeStoreAPI from "../../apis/fakeStoreApi";

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

export { fetchCart };
