import { cartActions } from "./cart-slice";

const fetchCartData = () => {
  return (dispatch) => {
    console.log("Fetching cart data!");
  };
};

export { fetchCartData };
