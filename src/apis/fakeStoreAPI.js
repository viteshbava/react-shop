import sendHttpRequest from "../utilities/sendHttpRequest";
import ReactError from "../utilities/reactError";

const BASE_URL = "https://fakestoreapi.com";
const URL = {
  PRODUCTS: BASE_URL + "/products",
  CARTS: BASE_URL + "/carts",
};

const fakeStoreApi = {
  getProduct: async (productId) => {
    if (!productId)
      throw new ReactError({
        message: "Empty product ID was supplied to fakeStoreApi!",
        statusCode: 400,
      });
    try {
      const product = await sendHttpRequest({
        url: `${URL.PRODUCTS}/${productId}`,
      });
      return product;
    } catch (err) {
      console.error(err.message);
      if (err.statusCode === 400)
        err.message = "That failed sorry!  Please try again later";
      if (err.statusCode === 404)
        err.message = `A product with that ID (${productId}) could not be found!`;
      throw err;
    }
  },

  getProducts: () => {
    const products = sendHttpRequest({
      url: URL.PRODUCTS,
      headers: {
        "content-type": "application/json",
      },
    });
    return products;
  },

  getCart: (cartId) => {
    if (!cartId)
      throw new ReactError({
        message: "Empty cart ID was supplied to fakeStoreApi!",
        statusCode: 400,
      });
    const cart = sendHttpRequest({
      url: `${URL.CARTS}/${cartId}`,
      headers: {
        "content-type": "application/json",
      },
    });
    return cart;
  },

  updateCart: (cartId, products) => {
    if (!cartId)
      throw new ReactError({
        message: "Empty cart ID was supplied to fakeStoreApi!",
        statusCode: 400,
      });
    const result = sendHttpRequest({
      method: "PUT",
      url: `${URL.CARTS}/${cartId}`,
      body: { products },
      headers: {
        "content-type": "application/json",
      },
    });
    return result;
  },
};

export default fakeStoreApi;
