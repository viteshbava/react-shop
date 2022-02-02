import React from "react";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import styles from "./AddToCartSummary.module.css";
import Modal from "../UI/Modal/Modal";
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

  return (
    <Modal>
      <Card className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            {itemsAdded} item(s) added to your cart
          </h2>
          <button onClick={closeSummaryHandler} className={styles.close}>
            &times;
          </button>
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
          <Button onClick={viewCartHandler}>
            <Icon icon={ICON_TYPE.CART} />
            View Cart
          </Button>
          <Button onClick={closeSummaryHandler} style={BTN_TYPE.SECONDARY}>
            Continue Shopping
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default AddToCartSummary;
