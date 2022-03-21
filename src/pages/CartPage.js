import Cart from "../components/Cart/Cart";
import useSetDocumentTitle from "../hooks/use-setDocumentTitle";

const CartPage = () => {
  useSetDocumentTitle("Cart");
  return <Cart />;
};

export default CartPage;
