import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalOverlay.module.css';
import useAnimate from '../../../hooks/use-animate';

const ModalOverlay = ({ closeModal, children }) => {
  // const modalRef = useRef();

  const {
    animateRef: modalRef,
    animateThenClose,
    animateStyle,
  } = useAnimate({
    onClose: () => closeModal(),
    exitInProgress: styles.exitInProgress,
    enterInProgress: styles.enterInProgress,
    enterStart: styles.enterStart,
  });

  useEffect(() => {
    document.body.classList.add(styles['body-disable-scroll']);
    modalRef.current.focus();
    return () => {
      document.body.classList.remove(styles['body-disable-scroll']);
    };
  }, [modalRef]);

  const overlayClickHandler = (e) => {
    if (!animateThenClose) return;
    if (e.target === e.currentTarget) animateThenClose();
  };

  const keyDownHandler = (e) => {
    if (!closeModal) return;
    if (e.key === 'Escape') animateThenClose();
  };

  const overlayClasses = `${styles.wrapper} ${animateStyle}`;

  return ReactDOM.createPortal(
    <div
      tabIndex={-1}
      onClick={overlayClickHandler}
      onKeyDown={keyDownHandler}
      className={overlayClasses}
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <div className={styles.container}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default ModalOverlay;
