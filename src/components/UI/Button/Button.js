import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";
import Spinner from "../Spinner/Spinner";

const Button = ({
  className,
  variant,
  color,
  onClick,
  children,
  type,
  link,
  icon,
  disabled,
  loading,
}) => {
  let btnStyles = styles.btn;
  btnStyles += variant
    ? ` ${styles[`btn--${variant}`]}`
    : ` ${styles["btn--fill"]}`;
  btnStyles +=
    disabled || loading
      ? ` ${styles["btn--disabled"]}`
      : color
      ? ` ${styles[`btn--${color}`]}`
      : ` ${styles["btn--primary"]}`;
  if (className) btnStyles += ` ${className}`;

  const content = (
    <>
      {loading && <Spinner className={styles.spinner} />}
      {!loading && icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );

  if (link)
    return (
      <Link onClick={onClick} className={btnStyles} to={link}>
        {content}
      </Link>
    );
  return (
    <button type={type} className={btnStyles} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
