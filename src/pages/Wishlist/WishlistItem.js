import React from "react";
import toDollars from "../../utilities/toDollars";
import { removeFromWishlist } from "../../redux/actions/wishlist-actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./WishlistItem.module.css";

const WishlistItem = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, image } = product;

  const removeProductHandler = () => dispatch(removeFromWishlist(id));

  return (
    <li className={styles["item-wrapper"]}>
      <Link className={styles["image-wrapper"]} to={`/products/${id}`}>
        <img className={styles.image} src={image} alt="Product Image" />
      </Link>
      <div className={styles["item-details"]}>
        <div className={styles["item-details__header"]}>
          <h3 className={styles["product-name"]}>
            <Link to={`/products/${id}`}>{title}</Link>
          </h3>
          <button
            onClick={removeProductHandler}
            className={styles.header__close}
          >
            &times;
          </button>
        </div>
        <p className={styles["product-id"]}>
          Product ID: <span>{id}</span>
        </p>
        <p className={styles.price}>{toDollars(price)}</p>
      </div>
    </li>
  );
};

export default WishlistItem;
