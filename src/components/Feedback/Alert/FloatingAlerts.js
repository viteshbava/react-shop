import styles from "./FloatingAlerts.module.css";
import ReactDOM from "react-dom";
import FloatingAlert from "./FloatingAlert";

const FloatingAlerts = ({ alerts }) => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      {alerts.map((a) => (
        <FloatingAlert key={a.id} {...a} />
      ))}
    </div>,
    document.querySelector("#alert-root")
  );
};

export default FloatingAlerts;
