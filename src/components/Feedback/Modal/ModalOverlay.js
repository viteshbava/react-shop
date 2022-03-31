import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalOverlay.module.css';
import useAnimate from '../../../hooks/use-animate';

const ModalOverlay = ({ closeModal, children }) => {
  const { animateRef, animateThenClose, animateStyle } = useAnimate({
    onClose: () => closeModal(),
    enterStart: styles.enterStart,
    enterInProgress: styles.enterInProgress,
    exitInProgress: styles.exitInProgress,
  });

  useEffect(() => {
    document.body.classList.add(styles['body-disable-scroll']);
    animateRef.current.focus();
    return () => {
      document.body.classList.remove(styles['body-disable-scroll']);
    };
  }, [animateRef]);

  const overlayClickHandler = (e) => {
    console.log('Overlay clicked!');
    if (!animateThenClose) return;
    if (e.target === e.currentTarget) animateThenClose();
  };

  const keyDownHandler = (e) => {
    console.log('Overlay escape pressed!');
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
      ref={animateRef}
    >
      <div className={styles.container}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default ModalOverlay;
