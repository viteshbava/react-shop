import React from "react";
import NumberButtons from "../UI/Control/NumberButtons";
import toDollars from "../../utilities/toDollars";
import styles from "./CartItem.module.css";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../redux/actions/cart-actions";
import { useDispatch } from "react-redux";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, image, quantity } = product;
  const subTotal = price * quantity;

  const removeProductHandler = () => dispatch(removeFromCart(id));

  const qtyUpdateHandler = () => console.log("Send quantity change to API...");

  return (
    <li className={styles["item-wrapper"]}>
      <div className={styles["image-wrapper"]}>
        <Link to={`/product/${id}`}>
          <img className={styles.image} src={image} alt="Product Image" />
        </Link>
      </div>
      <div className={styles["item-details"]}>
        <div className={styles["item-details__header"]}>
          <Link to={`/product/${id}`}>
            <h3 className={styles["product-name"]}>{title}</h3>
          </Link>
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
