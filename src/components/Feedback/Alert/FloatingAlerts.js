import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './FloatingAlerts.module.css';
import FloatingAlert from './FloatingAlert';
import Animate from '../../UI/Animate/Animate';
import AnimateList from '../../UI/Animate/AnimateList';

const FloatingAlerts = () => {
  const { alerts } = useSelector((state) => state.ui.alerts);
  const [renderAlerts, setRenderAlerts] = useState(false);

  useEffect(() => {
    if (alerts?.length) setRenderAlerts(true);
  }, [alerts?.length]);

  if (!renderAlerts) return null;

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <AnimateList unmountList={() => setRenderAlerts(false)}>
        {alerts.map((alert) => (
          <Animate
            key={alert.id}
            enterTime={200}
            exitTime={200}
            animation="fade"
          >
            <FloatingAlert alert={alert} />
          </Animate>
        ))}
      </AnimateList>
    </div>,
    document.querySelector('#alert-root')
  );
};

export default FloatingAlerts;
