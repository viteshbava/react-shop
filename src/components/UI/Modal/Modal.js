import { useContext } from "react";
import ModalContext from "../../../context/modal-context";
import Icon, { ICON_TYPE } from "../Icon/Icon";
import ModalOverlay from "./ModalOverlay";
import Card from "../Card/Card";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

const setIconAndColor = (variant) => {
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

const Modal = (props) => {
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

  let modalContent;

  if (type === "custom") {
    modalContent = customContent;
  } else {
    const { icon, color } = setIconAndColor(variant);
    let footer;
    switch (type) {
      case "confirm":
        if (!onConfirm)
          console.error("Confirm modal has not received a onConfirm action!");
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
      case "alert":
        footer = (
          <>
            <Button color={color} onClick={onOkayHandler}>
              {okText}
            </Button>
          </>
        );
        break;
      default:
        console.error(`Unknown modal type: ${type}`);
        break;
    }

    let cardClasses = styles.wrapper;
    cardClasses += ` ${styles[`wrapper--${color}`]}`;
    modalContent = (
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
  }

  return (
    <ModalOverlay onOverlayClick={closeModal}>{modalContent}</ModalOverlay>
  );
};

export default Modal;
