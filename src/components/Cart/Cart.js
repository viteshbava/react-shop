import { useState, useEffect } from "react";
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

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  const getCartContent = () => {
    if (initialRender) return <></>;
    if (isLoading)
      return (
        <>
          <SectionHeading>Cart</SectionHeading>
          <Spinner />
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
