import { productsActions } from "../slices/allProducts-slice";
import { selectedProductActions } from "../slices/selectedProduct-slice";
import fakeStoreApi from "../../apis/fakeStoreApi";

const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(productsActions.isLoading(true));
    // Fetch all product data
    const response_products = await fakeStoreApi.getProducts();
    // Update Redux state with products
    dispatch(productsActions.setProducts(response_products));
  } catch (err) {
    dispatch(productsActions.setError(err));
    // ERROR CODE GOES HERE
  }
  dispatch(productsActions.isLoading(false));
};

const fetchProduct = (productId) => async (dispatch) => {
  try {
    dispatch(selectedProductActions.isLoading(true));
    const response_product = await fakeStoreApi.getProduct(productId);
    dispatch(selectedProductActions.setProduct(response_product));
  } catch (err) {
    dispatch(selectedProductActions.setError(err));
    // ERROR CODE GOES HERE
  }
  dispatch(selectedProductActions.isLoading(false));
};

export { fetchProducts, fetchProduct };
