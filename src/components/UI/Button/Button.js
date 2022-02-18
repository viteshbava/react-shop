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
      // Note: children of link are inside a span so the a:visited declaration in index.module.css does not override the styles
      <Link to={link}>
        <span className={btnStyles}>{children}</span>
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
