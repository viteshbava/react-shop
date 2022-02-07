import styles from "./ControlWrapper.module.css";

const ControlWrapper = ({
  id,
  invalid,
  label,
  feedback,
  className,
  children,
}) => {
  let wrapperStyles = styles["wrapper"];
  if (className) wrapperStyles += ` ${className}`;
  if (invalid) wrapperStyles += ` ${styles["wrapper--invalid"]}`;

  return (
    <div className={wrapperStyles}>
      <label className={styles["label"]} htmlFor={id}>
        {label}
      </label>
      {children}
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
};

export default ControlWrapper;
