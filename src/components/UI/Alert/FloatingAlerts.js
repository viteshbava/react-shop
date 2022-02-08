import styles from "./FloatingAlerts.module.css";
import ReactDOM from "react-dom";
import Alert from "./Alert";

const FloatingAlerts = ({ alerts }) => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      {alerts.map((a, i) => (
        <Alert key={i} {...a} />
      ))}
    </div>,
    document.querySelector("#alert-root")
  );
};

export default FloatingAlerts;
