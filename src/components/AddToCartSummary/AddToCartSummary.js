import React from "react";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import styles from "./AddToCartSummary.module.css";

const AddToCartSummary = () => {
  return (
    <div>
      <h2>1 item(s) added to your cart</h2>
      <Icon icon={ICON_TYPE.TIMES} />
    </div>
  );
};

export default AddToCartSummary;
