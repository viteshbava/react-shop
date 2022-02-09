import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ onOverlayClick, children }) => {
  useEffect(() => {
    document.body.classList.add(styles["body-disable-scroll"]);
    return () => {
      document.body.classList.remove(styles["body-disable-scroll"]);
    };
  }, []);

  const overlayClickHandler = (e) => {
    if (!onOverlayClick) return;
    if (e.target === e.currentTarget) onOverlayClick();
  };

  return ReactDOM.createPortal(
    <>
      <div onClick={overlayClickHandler} className={styles.overlay}></div>
      <div className={styles.modal}>{children}</div>
    </>,
    document.querySelector("#modal-root")
  );
};

export default Modal;
