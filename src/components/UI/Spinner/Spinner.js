import styles from "./Spinner.module.css";

const Spinner = ({ className, spinnerWidth }) => {
  const wrapper_classes = className ? className : styles["default-wrapper"];

  const spinnerWidthStyle = {
    borderWidth: `${spinnerWidth ? spinnerWidth : 1}rem`,
    borderTopWidth: `${spinnerWidth ? spinnerWidth : 1}rem`,
  };

  return (
    <div className={wrapper_classes}>
      <div style={spinnerWidthStyle} className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
