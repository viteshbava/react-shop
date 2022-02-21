import styles from "./FloatingAlerts.module.css";
import ReactDOM from "react-dom";
import Alert from "./Alert";
import { useDispatch } from "react-redux";

const FloatingAlerts = ({ alerts }) => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      {alerts.map((a) => (
        <Alert key={a.id} {...a} />
      ))}
    </div>,
    document.querySelector("#alert-root")
  );
};

export default FloatingAlerts;
