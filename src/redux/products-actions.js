import { productsActions } from "./products-slice";
import fakeStoreAPI from "../apis/fakeStoreAPI";

const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(productsActions.isLoading(true));
    // Fetch all product data
    const response_products = await fakeStoreAPI.getProducts();
    // Update Redux state with products
    dispatch(productsActions.setProducts(response_products));
  } catch (err) {
    dispatch(productsActions.setError(err));
    // ERROR CODE GOES HERE
  }
  dispatch(productsActions.isLoading(false));
};

const fetchProduct = (productId) => async (dispatch) => {};

export { fetchProducts };
