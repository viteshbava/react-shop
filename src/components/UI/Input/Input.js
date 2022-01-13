import React from "react";
import styles from "./Input.module.css";

export default function Input({
  className,
  label,
  input,
  validFeedback,
  invalidFeedback,
}) {
  let wrapperStyles = styles["input-wrapper"];
  if (className) wrapperStyles += ` ${className}`;
  if (validFeedback) wrapperStyles += ` ${styles["input-wrapper--valid"]}`;
  if (invalidFeedback) wrapperStyles += ` ${styles["input-wrapper--invalid"]}`;

  return (
    <div className={wrapperStyles}>
      <label className={styles["input__label"]} htmlFor={input.id}>
        {label}
      </label>
      <input className={styles["input__input"]} {...input} />
      {validFeedback && (
        <div className={styles["input__feedback--valid"]}>{validFeedback}</div>
      )}
      {invalidFeedback &&
        invalidFeedback.map((f, i) => (
          <div key={i} className={styles["input__feedback--invalid"]}>
            {f}
          </div>
        ))}
    </div>
  );
}
