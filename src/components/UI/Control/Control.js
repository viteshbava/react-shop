// Component not to be used directly but to be used to build other components.

import styles from "./Control.module.css";

const CONTROL_TYPE = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

const Control = ({
  className,
  type,
  label,
  attributes,
  focusRef,
  invalid,
  feedback,
}) => {
  let wrapperStyles = styles["wrapper"];
  if (className) wrapperStyles += ` ${className}`;
  if (invalid) wrapperStyles += ` ${styles["wrapper--invalid"]}`;

  let control;
  switch (type) {
    case CONTROL_TYPE.INPUT:
      control = (
        <input ref={focusRef} className={styles["input"]} {...attributes} />
      );
      break;
    case CONTROL_TYPE.SELECT:
      control = (
        <select
          ref={focusRef}
          className={styles["select"]}
          {...attributes}
        ></select>
      );
      break;
    case CONTROL_TYPE.TEXTAREA:
      console.error("Have not built the text area type yet!");
      break;
    default:
      console.error("Invalid control type!");
      break;
  }
  return (
    <div className={wrapperStyles}>
      <label className={styles["label"]} htmlFor={attributes.id}>
        {label}
      </label>
      {control}
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
};

export default Control;
export { CONTROL_TYPE };
