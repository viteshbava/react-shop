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
      <Icon className={styles["danger-icon"]} icon={ICON_TYPE.DANGER} />
      <span className={styles.message}>{children}</span>
      <button className={styles.close}>&times;</button>
    </div>
  );
};

export default Alert;
export { ALERT_TYPE };
