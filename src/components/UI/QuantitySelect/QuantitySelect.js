import React from "react";
import styles from "./QuantitySelect.module.css";

const QuantitySelect = ({ className }) => {
  let wrapperStyles = styles["select-wrapper"];
  if (className) wrapperStyles += ` ${className}`;

  return (
    <div className={wrapperStyles}>
      <label className={styles["select-label"]}>Quantity</label>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
};

export default QuantitySelect;
