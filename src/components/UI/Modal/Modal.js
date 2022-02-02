import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../redux/slices/ui-slice";
import styles from "./Modal.module.css";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add(styles["body-disable-scroll"]);
    return () => {
      document.body.classList.remove(styles["body-disable-scroll"]);
    };
  }, []);

  const outsideClick = (e) => {
    if (e.target === e.currentTarget)
      dispatch(uiActions.showAddToCartSummary(null));
  };

  return ReactDOM.createPortal(
    <>
      <div onClick={outsideClick} className={styles.overlay}></div>
      <div className={styles.modal}>{children}</div>
    </>,
    document.querySelector("#modal-root")
  );
};

export default Modal;
