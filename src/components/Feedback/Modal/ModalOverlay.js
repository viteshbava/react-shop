import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ closeModal, children }) => {
  useEffect(() => {
    document.body.classList.add(styles['body-disable-scroll']);
    return () => {
      document.body.classList.remove(styles['body-disable-scroll']);
    };
  }, [closeModal]);

  const overlayClickHandler = (e) => {
    if (!closeModal) return;
    if (e.target === e.currentTarget) closeModal();
  };

  const keyDownHandler = (e) => {
    if (!closeModal) return;
    if (e.key === 'Escape') closeModal();
  };

  return ReactDOM.createPortal(
    <div
      tabIndex={-1}
      onClick={overlayClickHandler}
      onKeyDown={keyDownHandler}
      className={styles.wrapper}
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.container}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default ModalOverlay;
