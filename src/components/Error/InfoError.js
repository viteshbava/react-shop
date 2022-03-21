import Icon, { ICON_TYPE } from "../../components/UI/Icon/Icon";
import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import styles from "./InfoError.module.css";

const INFO_ERROR_TYPE = {
  ERROR: "error",
  INFO: "info",
};

const InfoError = ({ type, heading, message }) => {
  let icon_classes = styles.icon;
  let icon_type;
  switch (type) {
    case INFO_ERROR_TYPE.ERROR:
      icon_classes += ` ${styles["icon--error"]}`;
      icon_type = ICON_TYPE.ERROR;
      break;
    case INFO_ERROR_TYPE.INFO:
      icon_classes += ` ${styles["icon--info"]}`;
      icon_type = ICON_TYPE.INFO;
      break;
    default:
      console.error("Unknown info error type!");
      break;
  }
  return (
    <>
      <SectionHeading>{heading}</SectionHeading>
      <div className={styles.wrapper}>
        <Icon className={icon_classes} icon={icon_type} />
        <p className={styles.message}>{message}</p>
      </div>
    </>
  );
};

export default InfoError;
export { INFO_ERROR_TYPE };
