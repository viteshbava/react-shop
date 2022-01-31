import React from "react";
import Card from "../UI/Card/Card";
import styles from "./ProductListItem.module.css";
import toDollars from "../../utilities/toDollars";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import { useNavigate } from "react-router-dom";

const ProductListItem = ({ product }) => {
  const navigate = useNavigate();

  const productClickHandler = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <li className={styles["grid-flex"]} onClick={productClickHandler}>
      <Card className={styles.wrapper}>
        <div className={styles["image-wrapper"]}>
          <Icon
            className={styles["wishlist-toggle"]}
            icon={ICON_TYPE.HEART_EMPTY}
          />
          <img
            className={styles.image}
            src={product.image}
            alt="Product Image"
          />
        </div>
        <h2 className={styles.heading}>{product.title}</h2>
        <h1 className={styles.price}>{toDollars(product.price)}</h1>
      </Card>
    </li>
  );
};

export default ProductListItem;
