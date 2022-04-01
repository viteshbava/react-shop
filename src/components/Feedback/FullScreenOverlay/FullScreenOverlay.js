import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './FullScreenOverlay.module.css';

const FullScreenOverlay = ({ entering, exiting, onClose, children }) => {
  console.log('Start of Child');
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

  console.log('Is the component undergoing entering?? ', entering);
  console.log('Is the component undergoing exiting?? ', exiting);

  let overlayClasses = styles.wrapper;
  if (entering) overlayClasses += ` ${styles['enter-animate']}`;
  if (exiting) overlayClasses += ` ${styles['exit-animate']}`;

  console.log(overlayClasses);
  console.log('End of Child: Rendering it now...');
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
