import sendHttpRequest from '../utilities/sendHttpRequest';
import ReactError from '../utilities/reactError';

const BASE_URL = 'https://fakestoreapi.com';
const URL = {
  PRODUCTS: `${BASE_URL}/products`,
  CARTS: `${BASE_URL}/carts`,
};

const fakeStoreApi = {
  getProduct: (productId, signal = null) => {
    if (!productId)
      throw new ReactError({
        message: 'Empty product ID was supplied to fakeStoreApi!',
        statusCode: 400,
      });
    const product = sendHttpRequest({
      url: `${URL.PRODUCTS}/${productId}`,
      signal,
    });
    return product;
  },

  getProducts: (signal = null) => {
    const products = sendHttpRequest({
      url: URL.PRODUCTS,
      headers: {
        'content-type': 'application/json',
      },
      signal,
    });
    return products;
  },

  getCart: (cartId, signal = null) => {
    if (!cartId)
      throw new ReactError({
        message: 'Empty cart ID was supplied to fakeStoreApi!',
        statusCode: 400,
      });
    const cart = sendHttpRequest({
      url: `${URL.CARTS}/${cartId}`,
      headers: {
        'content-type': 'application/json',
      },
      signal,
    });
    return cart;
  },

  updateCart: (cartId, products) => {
    if (!cartId)
      throw new ReactError({
        message: 'Empty cart ID was supplied to fakeStoreApi!',
        statusCode: 400,
      });
    const result = sendHttpRequest({
      method: 'PUT',
      url: `${URL.CARTS}/${cartId}`,
      body: { products },
      headers: {
        'content-type': 'application/json',
      },
    });
    return result;
  },

  createUserCart: (cart) => {
    if (!cart)
      throw new ReactError({
        message: 'Empty cart was supplied to fakeStoreApi!',
        statusCode: 400,
      });
    const result = sendHttpRequest({
      method: 'POST',
      url: URL.CARTS,
      body: cart,
      headers: {
        'content-type': 'application/json',
      },
    });
    return result;
  },

  getUserCarts: (userId, signal = null) => {
    if (!userId)
      throw new ReactError({
        message: 'Empty user ID was supplied to fakeStoreApi!',
        statusCode: 400,
      });
    const userCarts = sendHttpRequest({
      url: `${URL.CARTS}/user/${userId}`,
      headers: {
        'content-type': 'application/json',
      },
      signal,
    });
    return userCarts;
  },
};

export default fakeStoreApi;
