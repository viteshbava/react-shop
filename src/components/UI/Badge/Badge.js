import React from "react";
import styles from "./Badge.module.css";

const Badge = ({ className, children }) => {
  let badgeStyles = styles.wrapper;
  if (className) badgeStyles = `${badgeStyles} ${className}`;
  return <div className={badgeStyles}>{children}</div>;
};

export default Badge;
