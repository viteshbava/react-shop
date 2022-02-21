import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({ onOverlayClick, children }) => {
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
      <div onClick={overlayClickHandler} className={styles.wrapper}></div>
      <div className={styles.container}>{children}</div>
    </>,
    document.querySelector("#modal-root")
  );
};

export default ModalOverlay;
