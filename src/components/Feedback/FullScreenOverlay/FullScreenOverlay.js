import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './FullScreenOverlay.module.css';
import Animate from '../../UI/Animate/Animate';

const FullScreenOverlay = ({ show, onClose, children }) => {
  const focusRef = useRef();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
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
      enterTime={200}
      exitTime={200}
      animation="fade"
      focusRef={focusRef}
    >
      <div
        ref={focusRef}
        tabIndex={-1}
        onClick={overlayClickHandler}
        onKeyDown={keyDownHandler}
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        className={styles.wrapper}
      >
        {children && <div className={styles.container}>{children}</div>}
      </div>
    </Animate>,
    document.querySelector('#modal-root')
  );
};

export default FullScreenOverlay;
