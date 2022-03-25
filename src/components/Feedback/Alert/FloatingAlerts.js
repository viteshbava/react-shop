import ReactDOM from 'react-dom';
import styles from './FloatingAlerts.module.css';
import FloatingAlert from './FloatingAlert';

const FloatingAlerts = ({ alerts }) =>
  ReactDOM.createPortal(
    <div className={styles.wrapper}>
      {alerts.map((alert) => (
        <FloatingAlert key={alert.id} alert={alert} />
      ))}
    </div>,
    document.querySelector('#alert-root')
  );

export default FloatingAlerts;
