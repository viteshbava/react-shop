import { useContext } from "react";
import ModalContext from "../../../context/modal-context";
import Icon, { ICON_TYPE } from "../../UI/Icon/Icon";
import ModalOverlay from "./ModalOverlay";
import Card from "../../UI/Card/Card";
import styles from "./Modal.module.css";
import Button from "../../UI/Button/Button";

const Modal = (props) => {
  const modalCtx = useContext(ModalContext);
  const closeModal = () => modalCtx.hideModal();
  const { type } = props;
  if (!type) {
    console.error("Modal type must be supplied!");
    return;
  }

  const modalContent = _getModalContent(props, closeModal);

  return (
    <ModalOverlay onOverlayClick={closeModal}>{modalContent}</ModalOverlay>
  );
};

export default Modal;

/*************************************************** 
Utility functions below used in this Modal component
****************************************************/

const _getModalContent = (props, closeModal) => {
  const {
    type,
    variant = "default",
    title,
    body,
    cancelText = "Cancel",
    okText = "Okay",
    onCancel,
    onConfirm,
    customContent,
  } = props;

  if (type === "custom") {
    if (!customContent) {
      console.error("customContent must be supplied for a custom modal type!");
      return;
    }
    return customContent;
  }

  const { icon, color } = _setIconAndColor(variant);

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
    case "alert":
      footer = (
        <>
          <Button color={color} onClick={onOkayHandler}>
            {okText}
          </Button>
        </>
      );
      break;
    case "confirm":
      if (!onConfirm) {
        console.error("Confirm modal has not received a onConfirm action!");
        return;
      }
      footer = (
        <>
          <Button onClick={onCancelHandler} variant="outlined" color={color}>
            {cancelText}
          </Button>
          <Button color={color} onClick={onOkayHandler}>
            {okText}
          </Button>
        </>
      );
      break;
    default:
      console.error(`Unknown modal type: ${type}`);
      return;
  }

  let cardClasses = styles.wrapper;
  cardClasses += ` ${styles[`wrapper--${color}`]}`;
  return (
    <Card className={cardClasses}>
      <button onClick={closeModal} className={styles["close-button"]}>
        &times;
      </button>
      <div className={styles.header}>
        {icon && <Icon icon={icon} className={styles["header__icon"]} />}
        <h2 className={styles["header__title"]}>{title}</h2>
      </div>
      <div className={styles.body}>{body}</div>
      <div className={styles.actions}>{footer}</div>
    </Card>
  );
};

const _setIconAndColor = (variant) => {
  let color;
  let icon;
  switch (variant) {
    case "default":
      color = "primary";
      break;
    case "info":
      icon = ICON_TYPE.INFO;
      color = "info";
      break;
    case "error":
      icon = ICON_TYPE.ERROR;
      color = "error";
      break;
    case "success":
      icon = ICON_TYPE.SUCCESS;
      color = "success";
      break;
    case "warning":
      icon = ICON_TYPE.WARNING;
      color = "warning";
      break;
    default:
      console.error(`Unknown modal variant supplied: ${variant}`);
      break;
  }
  return { color, icon };
};
