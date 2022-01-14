import React from "react";
import Card from "../UI/Card/Card";
import styles from "./ProductListItem.module.css";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";

const ProductListItem = ({ url }) => {
  return (
    <Card className={styles.wrapper}>
      <div className={styles["image-wrapper"]}>
        <Icon
          className={styles["wishlist-toggle"]}
          icon={ICON_TYPE.HEART_EMPTY}
        />
        <img className={styles.image} src={url} alt="Product Image" />
      </div>
      <h2 className={styles.heading}>Compact Digital Camera</h2>
      <h1 className={styles.price}>$99.90</h1>
    </Card>
  );
};

export default ProductListItem;
