import SectionHeading from "../UI/SectionHeading/SectionHeading";
import CartItem from "./CartItem";
import CartOrderSummary from "./CartOrderSummary";
import PageLoader from "../Feedback/PageLoader/PageLoader";
import InfoError, { INFO_ERROR_TYPE } from "../Error/InfoError";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css";

const Cart = () => {
  const { isLoading, hasLoaded, error, products, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const getCartContent = () => {
    if (isLoading || !hasLoaded)
      return (
        <>
          <SectionHeading>Cart</SectionHeading>
          <PageLoader />
        </>
      );

    if (error)
      return (
        <InfoError
          type={INFO_ERROR_TYPE.ERROR}
          heading="Error Fetching Cart!"
          message={error.message}
        />
      );

    if (!products || (products && !products.length))
      return (
        <InfoError
          type={INFO_ERROR_TYPE.INFO}
          heading="Your Cart is Empty!"
          message="Go add some products!"
        />
      );

    return (
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
  };

  return <section>{getCartContent()}</section>;
};

export default Cart;
