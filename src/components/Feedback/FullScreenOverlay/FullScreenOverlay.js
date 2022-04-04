import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './FullScreenOverlay.module.css';
import Animate from '../../UI/Animate/Animate';

const FullScreenOverlay = ({ show, onClose, children }) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add(styles['body-disable-scroll']);
    }
    return () => {
      document.body.classList.remove(styles['body-disable-scroll']);
    };
  }, [show]);

  const overlayClickHandler = (e) => {
    if (!onClose) return;
    if (e.target === e.currentTarget) onClose();
  };

  const keyDownHandler = (e) => {
    if (!onClose) return;
    if (e.key === 'Escape') onClose();
  };

  return ReactDOM.createPortal(
    <Animate
      isMounted={show}
      enterTime={150}
      exitTime={150}
      className={styles.wrapper}
    >
      <div
        tabIndex={-1}
        onClick={overlayClickHandler}
        onKeyDown={keyDownHandler}
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.container}>{children}</div>
      </div>
    </Animate>,
    document.querySelector('#modal-root')
  );
};

export default FullScreenOverlay;
