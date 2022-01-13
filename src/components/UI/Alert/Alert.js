import React from "react";
import styles from "./Alert.module.css";
import IconCustom, { ICON } from "../IconCustom/IconCustom";

const TYPE = {
  DANGER: "error",
  SUCCESS: "success",
};

const Alert = ({ type, children }) => {
  return (
    <div className={styles.container}>
      <IconCustom icon={ICON.DANGER} />
      {children}
      <IconCustom icon={ICON.TIMES} />
      <button className={styles.close}></button>
    </div>
  );
};

export default Alert;
export { TYPE };
