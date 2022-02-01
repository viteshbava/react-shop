import sendHttpRequest from "../utilities/sendHttpRequest";

const BASE_URL = "https://fakestoreapi.com";
const URL = {
  PRODUCTS: BASE_URL + "/products",
  CARTS: BASE_URL + "/carts",
};

const fakeStoreApi = {
  getProduct: (productId) => {
    const product = sendHttpRequest({
      url: `${URL.PRODUCTS}/${productId}`,
    });
    return product;
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
    const cart = sendHttpRequest({
      url: `${URL.CARTS}/${cartId}`,
      headers: {
        "content-type": "application/json",
      },
    });
    return cart;
  },

  updateCart: (cartId, products) => {
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
