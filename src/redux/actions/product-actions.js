import { productsActions } from "../slices/allProducts-slice";
import { selectedProductActions } from "../slices/selectedProduct-slice";
import fakeStoreApi from "../../apis/fakeStoreApi_test";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchProducts = createAsyncThunk(
  "allProducts/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await fakeStoreApi.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

const fetchProduct = createAsyncThunk(
  "allProducts/fetchProduct",
  async (productId, thunkAPI) => {
    try {
      return await fakeStoreApi.getProduct(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

const clearProduct = () => (dispatch) =>
  dispatch(selectedProductActions.clearProduct());

const clearAllProducts = (dispatch) =>
  dispatch(productsActions.clearAllProducts());

export { fetchProducts, fetchProduct, clearProduct, clearAllProducts };
