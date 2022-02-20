import { wishlistActions } from "../slices/wishlist-slice";
import { uiActions } from "../slices/ui-slice";
import { ALERT_TYPE } from "../../components/UI/Alert/Alert";
import fakeStoreAPI from "../../apis/fakeStoreApi";
// import store from "../store";

const fetchWishlist = (userId) => async (dispatch) => {
  dispatch(wishlistActions.isLoading(true));
  try {
    // Fetch wishlist for supplied userId
    // const response_wishlist = await [API CALL GOES HERE]
    /* No wishlist API in fakestoreAPI therefore using dummy wishlists */
    // const response_wishlist = []; /* empty dummy wishlist */
    const response_wishlist = [
      2, 4, 6, 9, 13, 15,
    ]; /* dummy wishlist with products */
    // Update total quantity
    const totalQuantity = response_wishlist.length;
    dispatch(wishlistActions.setTotalQuantity(totalQuantity));
    // Fetch product data for each item in wishlist
    const promises = response_wishlist.map(
      async (p) => await fakeStoreAPI.getProduct(p)
    );
    const wishlist = await Promise.all(promises);
    // Update Redux state with wishlist
    dispatch(wishlistActions.replaceWishlist(wishlist));
  } catch (err) {
    dispatch(wishlistActions.setError({ message: err.message }));
    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.ERROR,
        title: "Unable to fetch wishlist data!",
      })
    );
    console.error(err);
  }
  dispatch(wishlistActions.isLoading(false));
};

const addToWishlist = (product) => async (dispatch) => {
  dispatch(wishlistActions.loadingProduct(product.id));
  /* if user has not wishlist, create one here */
  // const { id: userId } = store.getState().user;
  console.log("TO DO: get the user Id to update wishlist");
  const userId = "1";
  try {
    // const result = await [API CALL GOES HERE]
    // NOTE: api call(s) below are only used to simulate the time it might take to add/remove from wishlist.  To be replaced with actual api call for add/remove wishlist.
    await fakeStoreAPI.getProducts();
    await fakeStoreAPI.getProducts();
    await fakeStoreAPI.getProducts();
    dispatch(wishlistActions.add(product));
    dispatch(wishlistActions.loadingProduct(null));
    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "Product added to wishlist!",
      })
    );
  } catch (err) {
    dispatch(wishlistActions.loadingProduct(null));
    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.ERROR,
        title: "Unable to add item to wishlist!",
      })
    );
    console.error(err);
  }
};

const removeFromWishlist = (productId) => async (dispatch) => {
  dispatch(wishlistActions.loadingProduct(productId));
  // const { id: userId } = store.getState().user;
  console.log("TO DO: get the user Id to update wishlist");
  try {
    // const result = await [API CALL GOES HERE]
    // NOTE: api call(s) below are only used to simulate the time it might take to add/remove from wishlist.  To be replaced with actual api call for add/remove wishlist.
    await fakeStoreAPI.getProducts();
    await fakeStoreAPI.getProducts();
    await fakeStoreAPI.getProducts();
    dispatch(wishlistActions.remove(productId));
    dispatch(wishlistActions.loadingProduct(null));
    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: `Product removed from wishlist!`,
      })
    );
  } catch (err) {
    dispatch(wishlistActions.loadingProduct(null));
    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.ERROR,
        title: "Unable to remove item from wishlist!",
      })
    );
    console.error(err);
  }
};

export { fetchWishlist, addToWishlist, removeFromWishlist };
