import styles from "./Spinner.module.css";

const Spinner = ({ className, width = "1.25rem", thinkness = "0.15rem" }) => {
  const dimensions = {
    width,
    height: width,
    borderWidth: thinkness,
    borderTopWidth: thinkness,
  };

  const spinnerClasses = styles.main + (className ? ` ${className}` : "");

  return <div style={dimensions} className={spinnerClasses}></div>;
};

export default Spinner;
