import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({
  className,
  variant,
  color,
  onClick,
  children,
  type,
  link,
}) => {
  let btnStyles = styles.btn;
  btnStyles += variant
    ? ` ${styles[`btn--${variant}`]}`
    : ` ${styles["btn--fill"]}`;
  btnStyles += color
    ? ` ${styles[`btn--${color}`]}`
    : ` ${styles["btn--primary"]}`;
  if (className) btnStyles += ` ${className}`;
  if (link) {
    return (
      // Note: the btn-link class is used to over-ride the a:visited styling form index.css
      <Link to={link} className={`${btnStyles} btn-link`}>
        {children}
      </Link>
    );
  } else {
    return (
      <button type={type} className={btnStyles} onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default Button;
