import SectionHeading from "../UI/SectionHeading/SectionHeading";
import CartItem from "./CartItem";
import CartOrderSummary from "./CartOrderSummary";
import Spinner from "../UI/Spinner/Spinner";
import InfoError, { INFO_ERROR_TYPE } from "../Error/InfoError";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css";

const Cart = () => {
  const { isLoading, error, products, totalQuantity } = useSelector(
    (state) => state.cart
  );

  let content;

  if (isLoading) {
    content = (
      <>
        <SectionHeading>Cart</SectionHeading>
        <Spinner />
      </>
    );
  } else if (error) {
    content = (
      <InfoError
        type={INFO_ERROR_TYPE.ERROR}
        heading="Error Fetching Cart!"
        message={error.message}
      />
    );
  } else if (!products || (products && !products.length)) {
    content = (
      <InfoError
        type={INFO_ERROR_TYPE.INFO}
        heading="Your Cart is Empty!"
        message="Go add some products!"
      />
    );
  } else {
    content = (
      <>
        <SectionHeading>Cart ({totalQuantity})</SectionHeading>
        <div className={styles["grid-wrapper"]}>
          <ul className={styles["item-list"]}>
            {products.map((p) => (
              <CartItem key={p.id} product={p} />
            ))}
          </ul>
          <CartOrderSummary />
        </div>
      </>
    );
  }

  return <section>{content}</section>;
};

export default Cart;
