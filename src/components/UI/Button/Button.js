import React from "react";
import styles from "./Button.module.css";

const BTN_TYPE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

const Button = ({
  className,
  style = BTN_TYPE.PRIMARY,
  onClick,
  children,
  type,
}) => {
  let btnStyles = styles.button;
  if (style) btnStyles = `${btnStyles} ${styles[`button--${style}`]}`;
  if (className) btnStyles = `${btnStyles} ${className}`;
  return (
    <button type={type} className={btnStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
export { BTN_TYPE };
