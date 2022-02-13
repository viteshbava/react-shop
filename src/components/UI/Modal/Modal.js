import { useContext } from "react";
import ModalContext from "../../../context/modal-context";
import ModalOverlay from "./ModalOverlay";
import Card from "../Card/Card";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const {
    type,
    variant,
    title,
    body,
    cancelText = "Cancel",
    okText = "Okay",
    onCancel,
    onConfirm,
    customContent,
  } = props;

  const modalCtx = useContext(ModalContext);
  const closeModal = () => modalCtx.hideModal();

  const onCancelHandler = () => {
    closeModal();
    if (onCancel) onCancel();
  };

  const onOkayHandler = () => {
    closeModal();
    if (onConfirm) onConfirm();
  };

  if (type === "custom") {
    return (
      <ModalOverlay onOverlayClick={closeModal}>{customContent}</ModalOverlay>
    );
  }

  let footer;
  switch (type) {
    case "confirm":
      if (!onConfirm)
        console.error("Confirm modal has not received a onConfirm action!");
      footer = (
        <>
          <button onClick={onCancelHandler}>{cancelText}</button>
          <button onClick={onOkayHandler}>{okText}</button>
        </>
      );
      break;
    case "alert":
      footer = (
        <>
          <button onClick={onOkayHandler}>{okText}</button>
        </>
      );
      break;
    default:
      console.error(`Unknown modal type: ${type}`);
      break;
  }

  return (
    <ModalOverlay onOverlayClick={closeModal}>
      <Card>
        <div className={styles.wrapper}>
          <div>{title}</div>
          <div>{body}</div>
          {footer}
        </div>
      </Card>
    </ModalOverlay>
  );
};

export default Modal;
