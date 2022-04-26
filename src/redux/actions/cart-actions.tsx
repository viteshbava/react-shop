import { cartActions } from '../slices/cart-slice';
import { uiActions } from '../slices/ui-slice';
import { ALERT_TYPE } from '../../components/Feedback/Alert/Alert';
import fakeStoreApi from '../../apis/fakeStoreApi_test';
import store, { AppDispatch } from '../store';
import Product from '../../models/product';
import CartProduct from '../../models/cartProduct';
import Cart from '../../models/cart';

/** ********************************************************
/**********************************************************
  Helper functions for cart-actions  
********************************************************* */
/** ******************************************************* */

const _fetchCartForUser = async (userId: number, abortSignal: AbortSignal) => {
  // Fetch array of carts for supplied userId
  const userCarts = (await fakeStoreApi.getUserCarts(
    userId,
    abortSignal
  )) as Cart[];
  // Assume that first element in array is the current cart for practice purposes.
  // In reality the API should somehow define the 'current' cart separately from 'cart history'
  return userCarts.length ? userCarts[0].id : null;
};

const _fetchCartData = async (
  cartId: number,
  abortSignal: AbortSignal,
  dispatch: AppDispatch
) => {
  // Fetch cart data
  const cartData = await fakeStoreApi.getCart(cartId, abortSignal);
  // Update total quantity
  const totalQuantity = cartData.products.reduce(
    (total: number, p: CartProduct) => total + p.quantity,
    0
  );
  // Display total quantity as we load products
  dispatch(cartActions.setTotalQuantity(totalQuantity));
  return cartData as {
    id: number;
    userId: number;
    products: CartProduct[];
    date: Date;
  };
};

const _fetchCartProducts = async (
  cartProducts: CartProduct[],
  abortSignal: AbortSignal
) => {
  // Fetch product data for each item in cart
  const promises = cartProducts.map(async (p) => {
    const responseProduct = (await fakeStoreApi.getProduct(
      p.productId,
      abortSignal
    )) as Product;
    return {
      data: responseProduct,
      quantity: p.quantity,
    };
  });
  // return array of products
  const productArray = await Promise.all(promises);
  return productArray;
};

const _createNewCart = async (
  userId: number,
  product: Product,
  quantity: number,
  dispatch: AppDispatch
) => {
  const newCart = await fakeStoreApi.createUserCart({
    userId,
    date: new Date(),
    products: [{ productId: product.id, quantity }],
  });
  newCart.products = [{ ...product, quantity }];
  dispatch(cartActions.replaceCart(newCart));
};

const _updateCart = async (
  cartId: number,
  product: Product,
  quantity: number,
  dispatch: AppDispatch
) => {
  await fakeStoreApi.updateCart(cartId, [{ productId: product.id, quantity }]);
  dispatch(cartActions.add({ product, quantity }));
};

/** ********************************************************
/**********************************************************
  Cart Actions
********************************************************* */
/** ******************************************************* */

const fetchUserCart =
  (userId: number, abortSignal: AbortSignal) =>
  async (dispatch: AppDispatch) => {
    dispatch(cartActions.isLoading(true));
    try {
      const cartId = await _fetchCartForUser(userId, abortSignal);
      if (cartId) {
        const cart = await _fetchCartData(cartId, abortSignal, dispatch);
        const cartProducts = await _fetchCartProducts(
          cart.products,
          abortSignal
        );
        // Swap product array in cart with new product data array
        const fullCart: Cart = { ...cart, products: cartProducts };
        // Update cart in Redux
        dispatch(cartActions.replaceCart(fullCart));
      } else dispatch(cartActions.clearCart());
    } catch (err: any) {
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
  ({
    product,
    quantity,
    onAddSuccess,
    onAddError,
  }: {
    product: Product;
    quantity: number;
    onAddSuccess?: () => void;
    onAddError?: (err: any) => void;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(uiActions.showLoadingState(true));
    const cart = store.getState().cart.data;
    const userId = 5; /* This is a dummy userID until authentication is built; we should be getting it from state */
    try {
      if (cart) await _updateCart(cart.id, product, quantity, dispatch);
      else await _createNewCart(userId, product, quantity, dispatch);
      dispatch(uiActions.showLoadingState(false));
      if (onAddSuccess) onAddSuccess();
    } catch (err: any) {
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
  ({
    productId,
    quantity,
    onError,
  }: {
    productId: number;
    quantity: number;
    onError: () => void;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(uiActions.showLoadingState(true));
    const cart = store.getState().cart.data;
    if (!cart)
      throw new Error('Cannot change product quantity in non-existent cart!');
    try {
      await fakeStoreApi.updateCart(cart.id, [{ productId, quantity }]);
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

const removeFromCart = (productId: number) => async (dispatch: AppDispatch) => {
  dispatch(uiActions.showLoadingState(true));
  const cart = store.getState().cart.data;
  if (!cart)
    throw new Error('Cannot change remove product from non-existent cart!');

  try {
    await fakeStoreApi.updateCart(cart.id, [{ productId, quantity: 0 }]);
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
