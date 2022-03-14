import { wishlistActions } from "../slices/wishlist-slice";
import { uiActions } from "../slices/ui-slice";
import { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import fakeStoreApi from "../../apis/fakeStoreApi_test";
// import store from "../store";

const fetchWishlist = (userId, abortSignal) => async (dispatch) => {
  dispatch(wishlistActions.isLoading(true));
  try {
    // Fetch wishlist for supplied userId
    // const response_wishlist = await [API CALL GOES HERE]
    // Simulate lengthy API call using wait helper function
    await wait(5000);
    /* No wishlist API in fakeStoreApi therefore using dummy wishlists */
    // const response_wishlist = []; /* empty dummy wishlist */
    const response_wishlist = [
      2, 4, 6, 9, 13, 15,
    ]; /* dummy wishlist with products */
    // Update total quantity
    // The abortSignal.aborted check is temporarily placed here to simulate the cencellation of the lengthy API call above
    if (!abortSignal.aborted) {
      const totalQuantity = response_wishlist.length;
      dispatch(wishlistActions.setTotalQuantity(totalQuantity));
    }
    // Fetch product data for each item in wishlist
    const promises = response_wishlist.map(
      async (p) => await fakeStoreApi.getProduct(p, abortSignal)
    );
    const wishlist = await Promise.all(promises);
    // Update Redux state with wishlist
    dispatch(wishlistActions.replaceWishlist(wishlist));
  } catch (err) {
    if (err.name !== "AbortError") {
      dispatch(wishlistActions.setError({ message: err.message }));
      dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.ERROR,
          title: "Unable to fetch wishlist data!",
        })
      );
      console.error(err);
    }
  }
  dispatch(wishlistActions.isLoading(false));
};

const addToWishlist = (product) => async (dispatch) => {
  dispatch(uiActions.showLoadingState(true));
  /* if user has not wishlist, create one here */
  // const { id: userId } = store.getState().user;
  console.log("TO DO: get the user Id to update wishlist");
  try {
    // const result = await [API CALL GOES HERE]
    // Simulate lengthy API call using wait helper function
    await wait(2000);
    dispatch(wishlistActions.add(product));
    dispatch(uiActions.showLoadingState(false));

    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "Product added to wishlist!",
      })
    );
  } catch (err) {
    dispatch(uiActions.showLoadingState(false));

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
  dispatch(uiActions.showLoadingState(true));
  // const { id: userId } = store.getState().user;
  console.log("TO DO: get the user Id to update wishlist");
  try {
    // const result = await [API CALL GOES HERE]
    // Simulate lengthy API call using wait helper function
    await wait(2000);
    dispatch(wishlistActions.remove(productId));
    dispatch(uiActions.showLoadingState(false));

    dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: `Product removed from wishlist!`,
      })
    );
  } catch (err) {
    dispatch(uiActions.showLoadingState(false));

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

/* HELPER FUNCTIONS FOR THIS FILE */

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
