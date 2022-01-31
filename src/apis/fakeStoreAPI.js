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
    });
    return products;
  },

  getCart: (cartId) => {
    const cart = sendHttpRequest({
      url: `${URL.CARTS}/${cartId}`,
    });
    return cart;
  },
};

export default fakeStoreApi;
