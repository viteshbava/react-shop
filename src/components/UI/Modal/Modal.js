import { useContext } from "react";
import ModalContext from "../../../context/modal-context";
import ModalOverlay from "./ModalOverlay";
import Card from "../Card/Card";
import styles from "./Modal.module.css";
// import { uiActions } from "../../../redux/slices/ui-slice";
// import { useDispatch } from "react-redux";

const Modal = (props) => {
  const {
    children,
    type,
    variant,
    title,
    body,
    cancelText = "Cancel",
    okText = "Okay",
    onCancel,
    onConfirm,
  } = props;

  const modalCtx = useContext(ModalContext);
  const closeModal = () => modalCtx.hideModal();

  // const dispatch = useDispatch();
  // const closeModal = () => dispatch(uiActions.showModal(false));

  const onCancelHandler = () => {
    closeModal();
    if (onCancel) onCancel();
  };

  const onOkayHandler = () => {
    closeModal();
    if (onConfirm) onConfirm();
  };

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
    case "custom":
      // Will expect footer/CTAs to be defined in children
      footer = <></>;
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
          {children && <div>{children}</div>}
          {footer}
        </div>
      </Card>
    </ModalOverlay>
  );
};

export default Modal;
