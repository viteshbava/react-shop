import styles from "./Hamburger.module.css";

const Hamburger = ({ onClick, className, rowHeight = 2 }) => {
  const buttonClasses = styles.wrapper + (className ? ` ${className}` : "");
  const height = { height: `${rowHeight}px` };
  return (
    <button onClick={onClick} className={buttonClasses}>
      <span style={height} className={styles.row}></span>
      <span style={height} className={styles.row}></span>
      <span style={height} className={styles.row}></span>
    </button>
  );
};

export default Hamburger;
