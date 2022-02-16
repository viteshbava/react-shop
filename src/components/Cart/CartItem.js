import React, { useContext } from "react";
import NumberButtons from "../UI/Control/NumberButtons";
import toDollars from "../../utilities/toDollars";
import styles from "./CartItem.module.css";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  changeQuantity,
} from "../../redux/actions/cart-actions";
import { useDispatch } from "react-redux";
import ModalContext from "../../context/modal-context";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, image, quantity } = product;
  const subTotal = price * quantity;

  const modal = useContext(ModalContext);

  const removeProductHandler = () => {
    modal.showModal({
      type: "confirm",
      variant: "warning",
      title: "Remove product from cart?",
      body: "Are you sure you want to remove this from your cart?",
      okText: "Remove Items",
      onConfirm: () => dispatch(removeFromCart(id)),
    });
  };

  const qtyUpdateHandler = (newVal, undoUpdate) =>
    dispatch(
      changeQuantity({
        productId: id,
        quantity: newVal,
        onError: undoUpdate,
      })
    );

  return (
    <li className={styles["item-wrapper"]}>
      <div className={styles["image-wrapper"]}>
        <Link to={`/product/${id}`}>
          <img className={styles.image} src={image} alt="Product Image" />
        </Link>
      </div>
      <div className={styles["item-details"]}>
        <div className={styles["item-details__header"]}>
          <h3 className={styles["product-name"]}>
            <Link to={`/product/${id}`}>{title}</Link>
          </h3>
          <button onClick={removeProductHandler} className={styles.close}>
            &times;
          </button>
        </div>
        <p className={styles["product-id"]}>
          Product ID: <span>{id}</span>
        </p>
        <p className={styles.price}>{toDollars(price)}</p>
        <div className={styles["item-details__footer"]}>
          <NumberButtons
            className={styles.quantity}
            label="Quantity"
            id="quantity"
            min="1"
            value={quantity}
            onUpdate={qtyUpdateHandler}
          />
          <p className={styles.subtotal}>
            Subtotal:{" "}
            <span className={styles["subtotal__value"]}>
              {toDollars(subTotal)}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
