import React from "react";
import styles from "./Alert.module.css";
import Icon, { ICON_TYPE } from "../Icon/Icon";

const ALERT_TYPE = {
  DANGER: "error",
  SUCCESS: "success",
};

const Alert = ({ type, children }) => {
  return (
    <div className={styles.container}>
      <Icon icon={ICON_TYPE.DANGER} />
      {children}
      <Icon icon={ICON_TYPE.TIMES} />
      <button className={styles.close}></button>
    </div>
  );
};

export default Alert;
export { ALERT_TYPE };
