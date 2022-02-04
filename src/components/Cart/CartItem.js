import React from "react";
import Control, { CONTROL_TYPE } from "../UI/Control/Control";
import toDollars from "../../utilities/toDollars";
import { cartParams } from "../../config/parameters";
import styles from "./CartItem.module.css";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../redux/actions/cart-actions";
import { useDispatch } from "react-redux";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, image, quantity } = product;
  const subTotal = price * quantity;

  const removeProductHandler = () => dispatch(removeFromCart(id));

  const qtyChangeHandler = () => console.log("quantity has changed!");

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
          <Control
            label="Quantity"
            className={styles.quantity}
            type={CONTROL_TYPE.SELECT}
            options={Array.from(
              { length: cartParams.maxQuantity },
              (_, i) => i + 1
            )}
            attributes={{ id: "quantity", onChange: qtyChangeHandler }}
            selected={quantity}
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
