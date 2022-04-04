import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './FullScreenOverlay.module.css';

const FullScreenOverlay = ({ entering, exiting, onClose, children }) => {
  const nodeRef = useRef();

  useEffect(() => {
    document.body.classList.add(styles['body-disable-scroll']);
    nodeRef.current.focus();
    return () => {
      document.body.classList.remove(styles['body-disable-scroll']);
    };
  }, [nodeRef]);

  const overlayClickHandler = (e) => {
    if (!onClose) return;
    if (e.target === e.currentTarget) onClose();
  };

  const keyDownHandler = (e) => {
    if (!onClose) return;
    if (e.key === 'Escape') onClose();
  };

  let overlayClasses = styles.wrapper;

  if (entering) overlayClasses += ` ${styles['enter-animate']}`;
  if (exiting) overlayClasses += ` ${styles['exit-animate']}`;

  return ReactDOM.createPortal(
    <div
      tabIndex={-1}
      onClick={overlayClickHandler}
      onKeyDown={keyDownHandler}
      className={overlayClasses}
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      ref={nodeRef}
    >
      <div className={styles.container}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default FullScreenOverlay;
