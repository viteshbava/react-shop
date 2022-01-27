import sendHttpRequest from "../utilities/sendHttpRequest";

const ROOT_URL = "https://fakestoreapi.com";
const URL = {
  PRODUCTS: ROOT_URL + "/products",
  CARTS: ROOT_URL + "/carts",
};

const callFakeStoreAPI = {
  getProduct: (productId) => {
    const product = sendHttpRequest({
      url: `${URL.PRODUCTS}/${productId}`,
    });
    return product;
  },

  getCart: (cartId) => {
    const cart = sendHttpRequest({
      url: `${URL.CARTS}/${cartId}`,
    });
    return cart;
  },
};

export default callFakeStoreAPI;
