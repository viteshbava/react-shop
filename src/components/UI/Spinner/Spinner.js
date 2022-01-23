import React from "react";
import styles from "./Spinner.module.css";

const Spinner = ({ className }) => {
  const wrapper_classes = className ? className : styles["default-wrapper"];
  return (
    <div className={wrapper_classes}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
