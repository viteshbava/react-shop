import React from "react";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import styles from "./AddToCartSummary.module.css";
import ModalOverlay from "../UI/Modal/ModalOverlay";
import toDollars from "../../utilities/toDollars";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/slices/ui-slice";
import { useNavigate } from "react-router-dom";

const AddToCartSummary = ({ itemsAdded }) => {
  const { totalQuantity, totalItemPrice: cartSubtotal } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeSummaryHandler = () =>
    dispatch(uiActions.showAddToCartSummary(null));

  const viewCartHandler = () => {
    dispatch(uiActions.showAddToCartSummary(null));
    navigate("/cart");
  };

  let cardClasses = styles.wrapper;
  cardClasses += ` ${styles["wrapper--error"]}`;

  return (
    <ModalOverlay onOverlayClick={closeSummaryHandler}>
      <Card className={cardClasses}>
        <button
          onClick={closeSummaryHandler}
          className={styles["close-button"]}
        >
          &times;
        </button>
        <div className={styles.header}>
          <Icon icon={ICON_TYPE.ERROR} className={styles["header__icon"]} />
          <h2 className={styles["header__title"]}>
            {itemsAdded} item(s) added to your cart
          </h2>
        </div>
        <div className={styles.body}>
          <p>
            <span className={styles["cart-subtotal-label"]}>Cart Subtotal</span>{" "}
            | {totalQuantity} items
          </p>
          <p className={styles["cart-subtotal-value"]}>
            {toDollars(cartSubtotal)}
          </p>
        </div>
        <div className={styles.actions}>
          <Button
            onClick={closeSummaryHandler}
            variant="outlined"
            color="error"
          >
            Continue Shopping
          </Button>
          <Button color="error" onClick={viewCartHandler}>
            <Icon icon={ICON_TYPE.CART} />
            View Cart
          </Button>
        </div>
      </Card>
    </ModalOverlay>
  );
};

export default AddToCartSummary;
