import { productsActions } from "../slices/allProducts-slice";
import { selectedProductActions } from "../slices/selectedProduct-slice";
import fakeStoreApi from "../../apis/fakeStoreApi_test";

const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(productsActions.isLoading(true));
    // Fetch all product data
    const response_products = await fakeStoreApi.getProducts();
    // Update Redux state with products
    dispatch(productsActions.setProducts(response_products));
  } catch (err) {
    dispatch(productsActions.setError({ message: err.message }));
    console.error(err.message);
  }
  dispatch(productsActions.isLoading(false));
};

const fetchProduct = (productId) => async (dispatch) => {
  try {
    dispatch(selectedProductActions.isLoading(true));
    const response_product = await fakeStoreApi.getProduct(productId);
    dispatch(selectedProductActions.setProduct(response_product));
  } catch (err) {
    dispatch(selectedProductActions.setError({ message: err.message }));
    console.error(err.message);
  }
  dispatch(selectedProductActions.isLoading(false));
};

const clearProduct = () => (dispatch) =>
  dispatch(selectedProductActions.clearProduct());

const clearAllProducts = (dispatch) =>
  dispatch(productsActions.clearAllProducts());

export { fetchProducts, fetchProduct, clearProduct, clearAllProducts };
